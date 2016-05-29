# Welcome to follow this twitter account:

> https://twitter.com/JlptB

here, you can get some resources for leaning Japanesee

# Use the  Twitter Ruby Gem

### get  sth from internet and

### do ifttt

这个 repo 主要做了这么几件事情:

1. 从 tanos.co.uk这个网站爬些日语的信息过来存储到本地   
2. 整理信息, 通过 cron job 还有 twitter client gem 来发送信息到 twitter,   
3. 通过 ifttt 来同步到微博(已经废弃, 微博 suck!)   


另外有点意思的就是每天从 NHK 网站爬新闻过来. 然后通过 `phantomjs` 画图出来,
通过 twitter client gem 发送到 twitter, 然后再通过 ifttt 同步到微博(废弃, 微博 suck!)   

- 为什么这么做?

因为NHK有一个服务就是把每日的新闻尽量简化, 也就是几十字内, 然后追加上假名( hiragana)进行发布.
我呢, 发现它有一个 api, 可以 json 返回内容. 所以我就每天去爬一下, 从 json 拿内容过来, 在我本地套用 ruby   
的 erb 模板, 生产最优移动页面, 然后存储本地, 然后通过` phantomjs` 生成图片. 然后发送.   


效果如下:



![Kobito.4Y70z0.png](https://qiita-image-store.s3.amazonaws.com/0/56713/81e6d067-06f6-2ea5-bee0-5e69481bcf98.png "Kobito.4Y70z0.png")



![Kobito.8hBWqX.png](https://qiita-image-store.s3.amazonaws.com/0/56713/5832fc01-6f42-07a2-8a9d-e5cfe7dbd4e8.png "Kobito.8hBWqX.png")


![Kobito.TfOxvz.png](https://qiita-image-store.s3.amazonaws.com/0/56713/40351473-c270-6dab-46b2-1f16aa554ba8.png "Kobito.TfOxvz.png")
