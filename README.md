# Yelp review extractor
Yelp crawler checking for the latest reviews.

## Sample input

<pre>
{
    "proxyGroup": "RESIDENTIAL",
    "mode": "recheck",
    "url_list": [{
            "URL": "https://www.yelp.com/biz/ffionas-restaurant-london",
            "cutoff_date": "2017-01-17",
            "ext_id": "a10"
        },
        {
            "URL": "https://www.yelp.com/biz/pink-onion-san-francisco",
            "cutoff_date": "2018-03-29",
            "ext_id": "a23"
        },
        {
            "URL": "https://www.yelp.com/biz/farmhouse-kitchen-thai-cuisine-san-francisco",
            "cutoff_date": "2018-03-29",
            "ext_id": "a24"
        }
    ]
}

</pre>
