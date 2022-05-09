# DeqSpeed service
<img src="https://user-images.githubusercontent.com/18516370/167412504-37cad87e-5696-4886-b513-b586a9083983.png" width="199">

DeqSpeed is a handy tool for objectively measuring Internet connection quality. Right in your browser you can measure such indicators as outgoing and incoming connection speeds, ping and Jitter.
Cloudflare CDN global network is used for testing, which allows you to find out not the technical-theoretical speed, but the practical one - the speed at which you actually access sites and services on the Internet.

Check it out and figure out your real Internet speed!
Browser version: https://deqspeed.pages.dev/

Also, DeqSpeed is available in the social network VKontakte as a mini-application.
Check it out here: https://vk.com/deqspeed

## But why? For what?
![image](https://user-images.githubusercontent.com/18516370/167397594-d1838471-f7a4-48a0-8cac-26071c0703a2.png)

The UN Sustainable Development Goals were recently presented, they will run until 2030 and consist of 17 critical areas whose solutions will change the world for the better. An important part of these plans is to provide all inhabitants of the Earth with a quality Internet connection.

DeqSpeed service is first and foremost a convenient tool that can be easily used by ordinary users to check the quality of their ISP's services. This directly increases people's awareness of the quality level of their ISP's network services.

Similar services often give an inaccurate picture. Our project solves this problem by testing network quality through the Cloudflare Rapid Delivery Network. Their globally distributed network allows us to get a valid result. They also operate the fastest, most stable, reliable, and transparent DNS service in the world - 1.1.1.1. And their CDN service is used by more than 79% of all sites on the Internet. That is what makes testing through their network the most rational. 
Plus, services like Speedtest have gone a long way toward making money, and their testing methods are easily circumvented. For example, major providers like Megafon often limit connection speeds on unlimited plans, but Speedtest servers are "white-listed," which is why when you test speed via Speedtest, Megafon's customers will see inflated speeds, when their actual speed is much lower due to intentional limitations.

The whole deception I noticed one day when I ran out of Internet rate. When it runs out, Internet access is restricted. So it was, the internet stopped working at that moment, but randomly I went to Speedtest app I noticed it was still working and also showed me inflated speed. That's when I realized that Speedtest servers are on a kind of "whitelist" if they remain available even when the plan has expired.

DeqSpeed uses widespread CDNs (from Cloudflare in particular), so it would not be possible to spot add them to its whitelist to cheat the testing system. More precisely, it would make no sense: then the whitelist would include the rest 79%+ of Internet sites in addition to DeqSpeed.
