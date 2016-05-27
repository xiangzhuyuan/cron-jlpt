require 'faraday'
require 'typhoeus'
require 'typhoeus/adapters/faraday'
require 'nokogiri'
require 'yaml'
require 'pry'
require 'open-uri'
require 'uri'

HOST            ='http://japanesetest4you.com/'
PREFIX          = 'flashcard/category/learn-japanese-vocabulary/page/'
BASE_HOME       = __dir__
IMAGE_DIR       = 'img'
vocabulary_list = []

begin
  conn = Faraday.new(:url => HOST) do |faraday|
    faraday.request :url_encoded
    faraday.response :logger
    faraday.adapter :typhoeus
  end


  (1...112).each do |page_index|
    puts '*'*50
    puts "we are doing #{page_index}"
    example                  = Nokogiri::HTML(conn.get("#{PREFIX}/#{page_index}/").body)
    # binding.pry
    page_vocabularies_images = example.css('div.entry.clearfix > p > a > img').empty? ? [] : example.css('div.entry.clearfix > p > a > img')
    puts "this page has #{page_vocabularies_images.length} images  ..."
    page_vocabularies_images.each { |image|

      src = image['src']
      puts src
      vocabulary_list.push src
    }
    # puts page_vocabularies
  end


rescue => e
  puts e.message
end
YAML.dump(vocabulary_list, File.open('vocabulary.yml', 'w'))
puts "start to download all images ...."
begin
  vocabulary_list.each_with_index { |vocabulary, index|
    puts "start the #{index + 1} ..."
    f_name    = File.basename(URI.parse(vocabulary).path)
    file_path = File.join(BASE_HOME, IMAGE_DIR, f_name)
    unless File.exist? file_path
      open(vocabulary) { |f|

        File.open(file_path, "wb") do |file|
          file.puts f.read
        end
      }
    else
      puts "image existed ..."
    end

  }
rescue => e
  puts e.message
end
