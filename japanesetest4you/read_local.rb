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
vocabulary_list = []

vocabulary_list = YAML.load_file(File.open('vocabulary.yml', 'r'))
puts "start to download all images ...."
begin
  vocabulary_list.each_with_index { |vocabulary, index|
    puts "start the #{index + 1} ..."
    f_name = File.basename(URI.parse(vocabulary).path)
    open(vocabulary) { |f|
      file_path = File.join(BASE_HOME, 'img', f_name)
      unless File.exist? file_path
        File.open(file_path "w+") do |file|
          file.puts f.read
        end
      else
        puts 'image existed, skipped...'
      end
    }
  }
rescue => e
  puts e.message
end
