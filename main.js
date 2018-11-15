const Apify = require('apify');
const delay = require('delay');

const reorder_date = async (date, reorder) => {
    if (date !== '') {
        return date.split('-')[reorder[0]] + '-' + await pad(date.split('-')[reorder[1]]) + '-' + await pad(date.split('-')[reorder[2]]);
    } else {
        return '0000-00-00';
    }
}

const pad = async (d) => {
    d = parseFloat(d);
    return (d < 10) ? '0' + d.toString() : d.toString();
}


async function gotoFunction({
    request,
    page
}) {

    await page.setRequestInterception(true);

    if (request.url.indexOf('?') === -1) {
        request.url = request.url + '?sort_by=date_desc';
    } else {
        request.url = request.url + '&sort_by=date_desc';
    }

    const ignored = [
        //'script',
        'image',
        'stylesheet'
    ];

    const ignored_urls = [
        'https://s3-media',
        'https://cdnjs.cloudflare.com/ajax/libs/react/',
        'https://sb.',
        'https://idsync.',
        '.doubleclick.net',
        '.cloudflare.com',
        'https://connect.facebook.net',
        'https://www.google-analytics.com/',
        'https://match.adsrvr.org',
        'https://tags.bluekai.com/',
        'https://ib.adnxs.com/',
        'https://insight.adsrvr.org',
        'https://js.adsrvr.org/'
    ];

    page.on('request', (request) => {
        const resourceType = request.resourceType();
        const resourceURL = request.url();

        if (ignored.includes(resourceType) || ignored_urls.some((item) => resourceURL.includes(item))) {
            request.abort();


        } else {
            request.continue();
            //console.log(resourceType);
            console.log('TYPE:', resourceType, ' !! URL:', resourceURL);
        }
    });



    const response = await page.goto(request.url, {
        timeout: 120000,
        waitUntil: ['domcontentloaded']
    });

    await Apify.utils.puppeteer.hideWebDriver(page);
    await Apify.utils.puppeteer.injectJQuery(page);
    await Apify.utils.puppeteer.injectUnderscore(page);

    await delay(5000);

    return response;
}


Apify.main(async () => {

    // Get queue
    const requestQueue = await Apify.openRequestQueue();

    // Get mode and enqueue pages
    const INPUT = await Apify.getValue('INPUT');
    const MODE = INPUT.mode;

    if (!(['normal', 'get_urls_only', 'recheck'].indexOf(MODE) !== -1)) {
        throw Error('Set unsupported mode:', MODE);

    } else {
        if (MODE === 'normal' && MODE === 'get_urls_only') {
            const additional_sorting = ['&sortby=review_count', '&sortby=review_count', ''];

            for (let i = 0; i < INPUT.location_urls.length; i++) {
                for (let j = 0; j < additional_sorting.length; j++) {
                    await requestQueue.addRequest(new Apify.Request({
                        url: INPUT.location_urls[i] + additional_sorting[j],
                        userData: {
                            label: 'LISTING'
                        }
                    }));
                }

            }
        } else if (MODE === 'recheck') {
            if (!INPUT.url_list) {
                throw Error('Missing Array url_list!');
            } else {
                for (let i = 0; i < INPUT.url_list.length; i++) {
                    var item = INPUT.url_list[i];
                    await requestQueue.addRequest(new Apify.Request({
                        // just for pagination remove
                        url: item.URL.replace(/-or\d+-/, '-'),
                        userData: {
                            label: 'DETAIL',
                            DATE: typeof(item.cutoff_date) !== 'undefined' ? await reorder_date(item.cutoff_date, '012'): '0000-00-00',
                                EXT_ID: item.ext_id,
                                label: 'DETAIL'
                        },

                    }));
                }
            }
        }
    }


    // Create crawler.
    const crawler = new Apify.PuppeteerCrawler({
        requestQueue,
        gotoFunction,
        proxyUrls: INPUT.proxyGroup ? [`http://groups-${INPUT.proxyGroup}:${process.env.APIFY_PROXY_PASSWORD}@proxy.apify.com:8000`] : [],
        maxConcurrency: 1,

        // This page is executed for each request.
        // If request failes then it's retried 3 times.
        // Parameter page is Puppeteers page object with loaded page.
        handlePageFunction: async ({
                page,
                request
            }) => {
                if (request.userData.label === 'DETAIL') {
                    // if the page is banned, enqueue it again (uniqueKey has to be changed)
                    if (await page.evaluate(() => {
                            return $(".biz-page-title").length
                        }) === 0) {
                        await delay(10000);
                        await requestQueue.addRequest(new Apify.Request({
                            url: request.url,
                            uniqueKey: request.url + Math.random(),
                            userData: request.userData
                        }));
                    }

                    var {
                        result,
                        pages_to_enqueue
                    } = await page.evaluate((request, INPUT) => {
                        var jsonLD = $('script[type="application/ld+json"]').eq(-1);

                        types = [];
                        if ($('.category-str-list').first().find('a').length !== 0) {
                            $('.category-str-list').first().find('a').each(function() {
                                types.push($(this).text().trim());
                            });
                        }
                        // parse data from JSON-LD
                        // output format is the same across all crawler runs (for Keboola integration)
                        var result = [];
                        var pages_to_enqueue = [];
                        var stopped_paging_reviews = false;

                        var sub_result = {
                            name: $('h1').text().trim(),
                            address: $('address').eq(1).text().trim(),
                            longitude: $('.lightbox-map.hidden').data('map-state') !== undefined ? $('.lightbox-map.hidden').data('map-state')['center']['longitude'] : null,
                            latitude: $('.lightbox-map.hidden').data('map-state') !== undefined ? $('.lightbox-map.hidden').data('map-state')['center']['latitude'] : null,
                            types: types.join('|'),
                            webpage: $('.offscreen:contains("Business website")').next('a').text().trim(),
                            price_range: $('.iconed-list-avatar span.business-attribute.price-range').data("remainder") !== undefined ? 4 - $('.iconed-list-avatar span.business-attribute.price-range').data("remainder").trim().length : null,
                            restaurant_url: request.url.split('?')[0],
                            ext_id: request.userData.EXT_ID,
                            rev_url: null,
                            author: null,
                            description: null,
                            datePublished: null,
                            ratingValue: null
                        };

                        console.log(JSON.stringify(sub_result));

                        if (jsonLD.length) {
                            //console.log(123);
                            jsonParsed = JSON.parse(jsonLD.eq(-1).html());
                            if (jsonParsed.review.length !== 0) {

                                var item = request.userData;

                                $(jsonParsed.review).each(function(no) {

                                    if (INPUT.mode === 'recheck') {
                                        var date_old = request.userData.DATE !== null ? request.userData.DATE : '0000-00-00';
                                        if (Date.parse(date_old) >= Date.parse(this.datePublished)) {
                                            stopped_paging_reviews = true;
                                            return false;
                                        }
                                    }
                                    var extender = {
                                        rev_url: window.location.origin + window.location.pathname + '?hrid=' + $('div.review.review--with-sidebar[data-review-id]').eq(no).data('review-id'),
                                        author: this.author || null,
                                        description: this.description || null,
                                        datePublished: this.datePublished || null,
                                        ratingValue: this.reviewRating ? this.reviewRating.ratingValue : null
                                    };
                                    result.push($.extend({}, sub_result, extender));

                                });
                            } else {
                                result.push(sub_result);
                            }
                        }
                        if (INPUT.mode === 'recheck') {
                            if (result.length === 0) {
                                result.push(sub_result);
                            }
                        }
                        console.log(JSON.stringify(result));


                        //enqueue next PAGES with REVIEWS
                        if (stopped_paging_reviews === false && INPUT.listing !== false) { //paging can be stoppped only in recheck mode
                            $('a.u-decoration-none.next.pagination-links_anchor ').each(function() {
                                var url = $(this).attr('href');
                                pages_to_enqueue.push({
                                    url: url,
                                    userData: request.userData
                                });

                            });
                        }
                        return {
                            result,
                            pages_to_enqueue
                        };
                    }, request, INPUT);

                }
                await Apify.pushData(result);
                console.log(result[result.length - 1].datePublished);
                for (let i = 0; i < pages_to_enqueue.length; i++) {

                    await requestQueue.addRequest(new Apify.Request(pages_to_enqueue[i]));
                }


            },

            // If request failed 4 times then this function is executed.
            handleFailedRequestFunction: async ({
                request
            }) => {
                console.log(`Request ${request.url} failed 4 times`);
            },
    });

    // Run crawler.
    await crawler.run();
});
