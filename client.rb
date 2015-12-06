#!/usr/bin/env ruby

require 'yaml'
require 'pry'
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

def twi_conn
  begin
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "A92HuuC2zgIBDbwWteMlQX3hK"
      config.consumer_secret     = "O6YLt1u3mIQOaBGw3LY91pQbpfdzpz5OdpnGyjzxkFhTmrIR26"
      config.access_token        = "143062296-A9bdsRSqe9xb6iPcuTY6xZLFhTCfozQ5zIFc6rJZ"
      config.access_token_secret = "oFAJxfhXG73Bqi8icTa4glKkGd1SErLjcMgunNV0m7i4Y"
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
        # target = example[:example].split(/\r?\n/)[0].gsub("\t", " ").squeeze(" ").strip
        target = example[:example].split(/\r?\n/).sample.gsub("\t", " ").squeeze(" ").strip
        twi    = "#JLPT (#{example[:level]})<#{example[:title]}> #{target}"
        puts twi
        #TODO add all into single web pages
        twi_list << (twi.length > 140 ? twi.slice(0, 135)+ '...' : twi)
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

# sent_twi(get_twi('/home/matt/cron-jlpt/grammar_list.txt'))

get_twi('./grammar_list_test.yml')