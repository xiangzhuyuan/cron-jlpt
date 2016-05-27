require 'faraday'
require 'typhoeus'
require 'typhoeus/adapters/faraday'
require 'nokogiri'


HOST   ='http://www.tanos.co.uk'
PREFIX = 'jlpt/skills/grammar/sentences/'

responses = []
begin
  conn = Faraday.new(:url => HOST) do |faraday|
    faraday.request :url_encoded # form-encode POST params
    faraday.response :logger # log requests to STDOUT
    faraday.adapter :typhoeus
  end

  conn.in_parallel do
    # responses << conn.get("jlpt/skills/grammar/sentences/?grammarid=300")

    example = Nokogiri::HTML(conn.get("jlpt/skills/grammar/sentences/?grammarid=300").body)
    puts example.css('#contentright > ul').text

  end

rescue => e
  puts e.message
end

