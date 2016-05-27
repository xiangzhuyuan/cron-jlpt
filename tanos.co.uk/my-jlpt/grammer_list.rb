require 'faraday'
require 'typhoeus'
require 'typhoeus/adapters/faraday'
require 'nokogiri'
require 'yaml'

def get_level(level)
  case level
    when 'JLPT N1' then
      '1'
    when 'JLPT N2' then
      '2'
    when 'JLPT N3' then
      '3'
    when 'JLPT N4' then
      '4'
    when 'JLPT N5' then
      '5'
    else
      ''
  end
end

# grammer_list = []
# File.open('./grammer_list.txt', 'r') do |lines|
#   while line = lines.gets
#     grammer_list << {title: line.split(' ')[1], link: line.split(' ')[0]}
#   end
#
# end
#
# puts grammer_list
HOST   ='http://www.tanos.co.uk'
PREFIX = 'jlpt/skills/grammar/sentences/'

puts '*'*50
puts "Starting to get all grammar items"

doc     = Nokogiri::HTML(IO.read('./all_resource.html'))
indexes = {}
count   = 0
doc.css('div').each do |div|
  # get level

  level = get_level(div.css('h2').text)
  puts "Start handle #{level} level ..."
  target = indexes[level.to_sym] = []

  puts "This #{level} level, we get #{div.css('ul li a').length} grammar items"
  count += div.css('ul li a').length
  div.css('ul li a').map do |item|
    target << {
        title: item.content,
        link:  item['href'].gsub('./', PREFIX),
        level: level
    }

  end

end

puts "Getting all finised, we got #{count} grammar items"
puts '*'*50
puts "Start to get all examples ... "
begin
  conn = Faraday.new(:url => HOST) do |faraday|
    faraday.request :url_encoded # form-encode POST params
    faraday.response :logger # log requests to STDOUT
    faraday.adapter :typhoeus
  end
  indexes.map do |level, items|
    puts "start level #{level}"
    items.map do |item|
      example        = Nokogiri::HTML(conn.get(item[:link]).body)
      item[:example] = example.css('#contentright > ul').empty? ? 'example is null' : example.css('#contentright > ul').text
      puts item
    end
  end
rescue => e
  puts e.message
end


File.open("grammar_list_#{Time.now.strftime("%Y_%m_%d_%H_%M")}.txt", "w") do |file|
  file.write indexes.to_yaml
end