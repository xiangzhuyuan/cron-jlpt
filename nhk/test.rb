require 'faraday'
require 'json'
require 'nokogiri'
require 'erb'
require 'yaml'
require 'pry'
require 'twitter'
require 'log4r'
include Log4r


BASE_HOME    = __dir__
NEWS_LST     = []
Publish_list = []


@my_logger = Log4r::Logger.new('nhk')
@my_logger.outputters << Log4r::FileOutputter.new('logtest', :filename =>  "#{BASE_HOME}/log/faraday.log")

def get_news_list
  @connection                      = Faraday.new('http://www3.nhk.or.jp/news/easy/') do |builder|
    builder.request :url_encoded
    builder.use Faraday::Response::Logger, @my_logger
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
      unless existed_list.include? news[:id]
        Publish_list << news[:id]
        # read all, get each id
        web_url    = "#{news[:id]}/#{news[:id]}.html"
        response   = @connection.get(web_url)
        page       = Nokogiri::HTML(response.body)
        title      = page.css("#newstitle").to_s.force_encoding(Encoding::UTF_8)
        content    = page.css("#newsarticle").to_s.force_encoding(Encoding::UTF_8)
        full_post  = news[:full_url].to_s.force_encoding(Encoding::UTF_8)
        only_title = news[:only_title].to_s.force_encoding(Encoding::UTF_8)

        puts "start read erb template html file ...."
        renderer = ERB.new(File.read(File.join(BASE_HOME, "index.html.erb")))
        puts "End read erb template html file ...."
        
        puts "render start ..."
        result   = renderer.result(binding)
        puts "render over, get result"
        
        html_file = File.join(store_place, "/html/", "#{news[:id]}.html")
        puts 'get html file location finish'
        puts 'start to write the html file'
        File.open(html_file, 'w:UTF-8') do |f|
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
puts Publish_list
puts "write sent list start"
File.open(File.join(BASE_HOME, "sent_list.txt"), 'w') do |f|
  f.write(Publish_list.join(","))
end
