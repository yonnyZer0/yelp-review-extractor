# Yelp review extractor
Yelp crawler which is checking for the latest reviews.

## Sample input
<b>Required parameters</b>
-> "mode"
-> "url_list" -> "URL"

<b>Optional p.</b>
-> "proxyGroup"
-> ("url_list") -> "cutoff_date", "ext_id"

<b>Parameter explanation</b>
"proxyGroup" [used Apify proxy group]
"mode" [currently supported mode of this crawler]
"url_list" [array of restaurant configs]

"URL" [yelp url of restaurant]
"cutoff_date"[publish date of the last known review] - if not set -> "0000-00-00" date is set
"ext_id" [optional external id returned in result] - if not set -> returned null


<pre>
{
    "proxyGroup": "RESIDENTIAL",
    "mode": "recheck",
    "url_list": [{
            "URL": "https://www.yelp.com/biz/ffionas-restaurant-london",
            "cutoff_date": "2017-01-17",
            "ext_id": "212"
        },
        {
            "URL": "https://www.yelp.com/biz/pink-onion-san-francisco"
        }
    ]
}

</pre>
