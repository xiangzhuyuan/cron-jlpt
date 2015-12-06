require 'typhoeus'
require 'json'
require 'erb'
require 'yaml'

erb_file = './jlpt/no-sidebar.html.erb'

def get_short_link(url)
  begin
    base_uri = "http://api.t.sina.com.cn/short_url/shorten.json?source=1339868977&url_long=#{url}"
    res      = Typhoeus.get(base_uri, followlocation: true)
    puts JSON.parse(res.body)[0]["url_short"]
    JSON.parse(res.body)[0]["url_short"]

  rescue => e
    puts e.message
    ''
  end
end

def get_twi(source)
  grammar_list = []
  puts "Start get twi list ..."
  count = 0
  begin
    all_grammar_list = YAML::load_file(source)
    # puts grammar_list.keys
    all_grammar_list.each_pair do |level, val|
      grammar_list.concat val
    end
    grammar_list.each { |item|
      puts count +=1
      # binding.pry
      id                = Random.new_seed
      item[:id]         = id
      base_url          = "http://www.xiangzhuyuan.com/jlpt/#{id}.html"
      item[:link]       = base_url
      item[:short_link] = get_short_link(base_url)
    }
  rescue => e
    puts e.message

  end
  puts " finished get all twi"
  grammar_list
end

def generate_html(data_list)
  begin
    data_list.each { |item|
      # read all, get each id
      html_file = "./jlpt/#{item[:id]}.html"

      title      = item[:title]
      level      = item[:level]
      link       = item[:link]
      short_link =item[:short_link]
      examples   = item[:example].split(/\r?\n/)
      puts "start read erb, and create html file ...."
      renderer = ERB.new(File.read("./jlpt/basic.html.erb"))
      result   = renderer.result(binding)

      File.open(html_file, 'w') do |f|
        puts "write #{html_file} start"
        f.write(result)
      end

    }

  rescue => e
    puts e.message
  end

end

# dump new twi
result = get_twi('grammar_list.yml')

begin
  File.open("new_grammar_list.yml", "w") do |file|
    file.write result.to_yaml
  end
rescue => e
  puts e.message
end
generate_html(result)

# get_short_link("http://www.xiangzhuyuan.com")