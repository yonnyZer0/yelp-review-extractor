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
            "ext_id": "212"
        },
        {
            "URL": "https://www.yelp.com/biz/pink-onion-san-francisco"
        }
    ]
}

</pre>

<b>Required parameters</b>
<p>
-> "mode" [currently supported mode of this crawler]
</p><p>
-> "url_list" [array of restaurant configs]</p><p>
    -> "URL" [yelp url of restaurant]
</p>
<b>Optional p.</b>
<p>
-> "proxyGroup" [used Apify proxy group]
</p><p>
    -> "cutoff_date" [publish date of the latest known review, if not set -> "0000-00-00"(YYYY-MM-DD) date used]</p>
    <p>
    -> "ext_id" [returned in result, if not set -> returned null]
</p>
