# Yelp review extractor
Yelp crawler which checks for the newest restaurant reviews.

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

## Output example

<pre>
[{
  "name": "Ffiona’s Restaurant",
  "address": "51 Kensington Church Street, London W8 4BA, United Kingdom",
  "longitude": -0.192783395566043,
  "latitude": 51.50405773515,
  "types": "British",
  "webpage": "ffionas.com",
  "price_range": 2,
  "restaurant_url": "https://www.yelp.com/biz/ffionas-restaurant-london",
  "ext_id": "a10",
  "rev_url": "https://www.yelp.com/biz/ffionas-restaurant-london?hrid=UNwAlHNkV6nWSOyzsGRZ_g",
  "author": "Guisela L.",
  "description": "Absolute gem! We were so happy when we called (last minute) for a reservation and got in. Down home cooking at a friendly budget and that takes your breath away! Ffiona was absolutely wonderful to us and we're a mixed couple of girls so I'm not sure about the complaints on discrimination. Word to the wise: listen to what is being offered, she means what she's saying if something is good or recommended. And, we're the travelers in her house so take it easy, enjoy some wine and order some delicious food, everything else will fall into place. We had so much fun we made a new friend for life. I'm so thrilled we decided to come in despite the few scary reviews. \n\nWe ordered: half bottle of white wine, fizzy water, scallops for appetizer, chicken Kiev, an assortment of sides, the special seafood stew, and last but not least, sticky toffee pudding. Everything is a must order.",
  "datePublished": "2018-11-05",
  "ratingValue": 5
},
{
  "name": "Ffiona’s Restaurant",
  "address": "51 Kensington Church Street, London W8 4BA, United Kingdom",
  "longitude": -0.192783395566043,
  "latitude": 51.50405773515,
  "types": "British",
  "webpage": "ffionas.com",
  "price_range": 2,
  "restaurant_url": "https://www.yelp.com/biz/ffionas-restaurant-london",
  "ext_id": "a10",
  "rev_url": "https://www.yelp.com/biz/ffionas-restaurant-london?hrid=0YIYWVM5O84RWBT8YN3lSQ",
  "author": "Jasmin U.",
  "description": "The food was delicious!!! Service was great!!! Best scallops I've ever had I highly recommend checking this place out if you are in town. You won't regret it!",
  "datePublished": "2018-11-03",
  "ratingValue": 5
},
{
  "name": "Ffiona’s Restaurant",
  "address": "51 Kensington Church Street, London W8 4BA, United Kingdom",
  "longitude": -0.192783395566043,
  "latitude": 51.50405773515,
  "types": "British",
  "webpage": "ffionas.com",
  "price_range": 2,
  "restaurant_url": "https://www.yelp.com/biz/ffionas-restaurant-london",
  "ext_id": "a10",
  "rev_url": "https://www.yelp.com/biz/ffionas-restaurant-london?hrid=D1zCTDCZNiwMBkmLnQvq3w",
  "author": "Jordan N.",
  "description": "Our favorite meal after 5 days in London. Highly recommend making a reservation. We walked in without one and got lucky because someone had just cancelled. The place is small and intimate, warm and inviting. Ffiona is friendly, and you can tell the locals go here. We started with the King Prawns which were delicious and flavorful. The chicken kiev is amazing, one of the best things I've ever eaten. We also got the steak and kidney pie which did not disappoint. The mash and greens were great too. No complaints and would definitely recommend this to anyone who wants a nice, hearty dinner in London.",
  "datePublished": "2018-10-30",
  "ratingValue": 5
},
{
  "name": "Ffiona’s Restaurant",
  "address": "51 Kensington Church Street, London W8 4BA, United Kingdom",
  "longitude": -0.192783395566043,
  "latitude": 51.50405773515,
  "types": "British",
  "webpage": "ffionas.com",
  "price_range": 2,
  "restaurant_url": "https://www.yelp.com/biz/ffionas-restaurant-london",
  "ext_id": "a10",
  "rev_url": "https://www.yelp.com/biz/ffionas-restaurant-london?hrid=er0z_wdSJ_5rXVZB0y-80Q",
  "author": "嘉儀",
  "description": "This lady in picture is racist. I am Asian. And I waited in the queue for the long time, but she only let others white people or family to go inside ( I know some didn't book) but let me alone. Even worse, a Middle East woman didn't make a reservation but came later than me but she let her in but ignored me and told me that there were no vacancy. We waited close to the door, but some other customers came in and there we're still gaps in the door, she was mad about that and shouted at me and my friends to close my door. Is this my responsibility to help you close the door if it's caused by others lady? If you want your customers to close the door. Why don't you be polite and I will feel more comfortable. This experience made me sad and disappointed, I wonder why where were still some people live in their small and unreasonable discrimination world？\n中国人不要来。这个餐厅服务员搞歧视。让中东人排在我们后面的还有白人先进（他们都是没有预约的），让我和我的朋友等了很久还不让我们坐下。告诉我们没有位子了。然后门是关不紧的，别人进来门没关好漏风，不是我们的问题，还很凶地让我帮她关上。服务态度极差！",
  "datePublished": "2018-10-28",
  "ratingValue": 1
},
{
  "name": "Ffiona’s Restaurant",
  "address": "51 Kensington Church Street, London W8 4BA, United Kingdom",
  "longitude": -0.192783395566043,
  "latitude": 51.50405773515,
  "types": "British",
  "webpage": "ffionas.com",
  "price_range": 2,
  "restaurant_url": "https://www.yelp.com/biz/ffionas-restaurant-london",
  "ext_id": "a10",
  "rev_url": "https://www.yelp.com/biz/ffionas-restaurant-london?hrid=qBpbNAV2bDauresMeJgOiA",
  "author": "Joe J.",
  "description": "Happy Halloween was back October 7, 2018 for dinner and it was again World Class with that touch only Ffiona can do. \nHad a fabulous veal chop with an amazing mushroom sauce OMG. Of course I had the amazing soup so fresh and that organic Parmesan salad with Ffiona's own fabulous dressing \nJust tying it makes me salivate in anticipation of my next visit!!!\nService was superb as usual and they got a new member of the family, she will fit right in so kind and genuine. All of what one would expect if there own mother was hosting a dinner. \nIF YOU HAVE NOT BEEN GO....... ITS NOT TO BE MISSED \n\nFfiona's is not to be missed if your in London it's so wonderfully amazing your want to skip the tours and just have a relaxing world class sup\n\n\n\n\nGoing tonight can't wait...24 October 2018 will update later or see y'all there\n\nAnother fabulous supper that only Ffiona can do!\nHad the second famous fish stew freshly made to order served piping hot as only the worlds best restaurant can do cannot express my delight with her Fabulous Seafood Stew like no other........brimming with fresh seafood OMG I ALREADY WANT MORE.........\n\nStarted with the super fresh organic Parmesan salad lightly topped with Ffiona's own House made salad dressing \n\nThen onto that seafood stew mouth is watering just thinking about it again\n\nCan't wait to get back to London next week for another visit \n\nOh almost forgot the best part of tonight was the service better than at home........gonna have to bring my mother if I can get her on the plane\n\nTill next week.......",
  "datePublished": "2018-10-24",
  "ratingValue": 5
}, ...]
</pre>
