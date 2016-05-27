
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