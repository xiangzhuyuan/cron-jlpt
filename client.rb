#!/usr/bin/env ruby

require 'yaml'
require 'pry'
require 'twitter'

BASE_HOME = __dir__

def twi_conn
  begin
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['CONSUMER_KEY']
      config.consumer_secret     = ENV['CONSUMER_SECRET']
      config.access_token        = ENV['ACCESS_TOKEN']
      config.access_token_secret = ENV['ACCESS_TOKEN_SECRET']
    end
  rescue => e
    puts "Get twi conection failed with #{e.message}"
  end
end

def get_twi(source)

  send_list = []
  twi_list  = []
  begin
    grammar_list = YAML::load_file(source)
    # puts grammar_list.keys
    grammar_list.each_pair do |level, val|
      send_list << val.sample
    end
  rescue => e
    puts e.message

  end
  if send_list.any?
    send_list.each do |example|
      begin
        content = example[:example].split(/\r?\n/).sample.gsub("\t", " ").squeeze(" ").strip
        twi     = "#JLPT (#{example[:level]})<#{example[:title]}> #{content}"
        twi_list << (twi.length > 110 ? twi.slice(0, 110)+ '...' : twi) + " #{example[:short_link]}"
      rescue => e
        puts e.message
      end
    end
  end

  twi_list
end

def sent_twi(twi_list)

  begin
    twi_list.each { |item|
      twi_conn.update(item)
      sleep(5)
    }
  rescue Twitter::Error::Forbidden => e
    puts e.message
  end
end

def sent_twi_test(twi_list)

  begin
    twi_list.each { |item|
      puts item
    }
  rescue Twitter::Error::Forbidden => e
    puts e.message
  end
end

sent_twi(get_twi(File.join(BASE_HOME, 'grammar_list_with_id_short_url.yml')))
