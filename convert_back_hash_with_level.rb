require 'yaml'
require 'pry'


grammar_list = {

    N1: [],
    N2: [],
    N3: [],
    N4: [],
    N5: []

}
count        = 0
begin
  all_grammar_list = YAML::load_file('new_grammar_list.yml')
  # puts grammar_list.keys
  all_grammar_list.each do |item|
    puts count+=1
    if item[:level] == "1"
      grammar_list[:N1] << item
    elsif item[:level] == "2"
      grammar_list[:N2] << item
    elsif item[:level] == "3"
      grammar_list[:N3] << item
    elsif item[:level] == "4"
      grammar_list[:N4] << item
    elsif item[:level] == "5"
      grammar_list[:N5] << item
    end
  end

rescue => e
  puts e.message

end
grammar_list


begin
  File.open("grammar_list_with_id_short_url.yml", "w") do |file|
    file.write grammar_list.to_yaml
  end
rescue => e
  puts e.message
end