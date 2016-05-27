require 'typhoeus'
require 'json'
require 'erb'
require 'yaml'


begin
  html_file = "./jlpt/index.html"
  examples = YAML::load_file('new_grammar_list.yml')

  puts "start read erb, and create html file ...."
  renderer = ERB.new(File.read("./jlpt/index.html.erb"))
  result   = renderer.result(binding)

  File.open(html_file, 'w') do |f|
    puts "write #{html_file} start"
    f.write(result)
  end


rescue => e
  puts e.message
end