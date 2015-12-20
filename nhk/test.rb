require 'faraday'
require 'json'
require 'nokogiri'
require 'erb'
require 'yaml'
require 'pry'
require 'twitter'


BASE_HOME    = __dir__
NEWS_LST     = []
Publish_list = []

def get_news_list
  @connection                      = Faraday.new('http://www3.nhk.or.jp/news/easy/') do |builder|
    builder.request :url_encoded
    builder.response :logger
    builder.adapter Faraday.default_adapter
  end
  @connection.headers[:user_agent] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like
 Gecko) Version/7.0.3 Safari/7046A194A Safari 6.0"

  begin
    response = @connection.get('news-list.json')
    body     = response.body.encode('utf-8', {invalid: :replace, undef: :replace, replace: ''})
    json     = JSON.parse(body)
    # puts json
    json.each do |item|
      item.each do |key, news_list|
        news_list.each do |news|
          NEWS_LST.push({
                            id:           news["news_id"],
                            ony_title:    news["title"],
                            title:        news["title_with_ruby"],
                            publish_date: news["news_publication_time"],
                            full_url:     news["news_web_url"]
                        })
        end
      end
    end
  rescue => e
    puts e.message
  end
end

def get_existed_file_list(extension)
  subdir = ext = extension
  Dir["#{BASE_HOME}/#{subdir}/*.#{ext}"].map { |item| File.basename(item, ".#{ext}") }
end

def generate_html(store_place, news_list)
  existed_list = get_existed_file_list("html")
  begin
    news_list.each { |news|
      if !existed_list.include? news[:id]
        Publish_list << news[:id]
        # read all, get each id
        web_url    = "#{news[:id]}/#{news[:id]}.html"
        response   = @connection.get(web_url)
        page       = Nokogiri::HTML(response.body)
        title      = page.css("#newstitle")
        content    = page.css("#newsarticle")
        full_post  = news[:full_url]
        only_title = news[:only_title]

        puts "start read erb, and create html file ...."
        renderer = ERB.new(File.read(File.join(BASE_HOME, "index.html.erb")))
        result   = renderer.result(binding)

        html_file = File.join(store_place, "/html/", "#{news[:id]}.html")

        File.open(html_file, 'w') do |f|
          puts "write #{html_file} start"
          f.write(result)
        end
      end
    }
  rescue => e
    puts e.message
  end
end


get_news_list
generate_html(BASE_HOME, NEWS_LST)
Publish_list.concat get_existed_file_list("png").sample(4) if Publish_list.empty?

File.open(File.join(BASE_HOME, "sent_list.txt"), 'w') do |f|
  puts "write sent list start"
  f.write(Publish_list.join(","))
end
