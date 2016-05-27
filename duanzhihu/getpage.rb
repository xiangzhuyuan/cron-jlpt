require 'faraday'
require 'typhoeus'
require 'typhoeus/adapters/faraday'
require 'nokogiri'
require 'yaml'
require 'pry'
require 'open-uri'
require 'uri'

HOST        ='http://www.duanzhihu.com/'
PREFIX      = '/comment/'
BASE_HOME   = __dir__
IMAGE_DIR   = 'img'
duanzi_list = []

begin
  conn = Faraday.new(:url => HOST) do |faraday|
    faraday.request :url_encoded
    faraday.response :logger
    faraday.adapter :typhoeus
  end


  page        = Nokogiri::HTML(conn.get("#{PREFIX}").body)
  # binding.pry
  duanzi_list = page.css('div.panel.panel-info').empty? ? [] : page.css('div.panel.panel-info')
  duanzi_list.each do |duanzi|
    binding.pry

  end

rescue => e
  puts e.message
end


YAML.dump(duanzi_list, File.open('vocabulary.yml', 'w'))
puts "start to download all images ...."
begin
  duanzi_list.each_with_index { |vocabulary, index|
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
