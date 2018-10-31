# Yelp review extractor
Yelp crawler which is checking for the latest reviews.

## Sample input
<b>Required parameters</b>
<p>
-> "mode"
</p><p>
-> "url_list" -> "URL"
</p>
<b>Optional p.</b>
<p>
-> "proxyGroup"
</p><p>
-> ("url_list") -> "cutoff_date", "ext_id"
</p>
<b>Parameter explanation</b>
<p>
"proxyGroup" [used Apify proxy group]
</p><p>
"mode" [currently supported mode of this crawler]
</p><p>
"url_list" [array of restaurant configs]

"URL" [yelp url of restaurant]
"cutoff_date"[publish date of the last known review] - if not set -> "0000-00-00" date used
"ext_id" [optional external id returned in result] - if not set -> returned null

</p>
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
