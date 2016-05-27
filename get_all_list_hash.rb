require 'yaml'
require 'pry'

def get_twi(source)
  grammar_list = []

  begin
    all_grammar_list = YAML::load_file(source)
    # puts grammar_list.keys
    all_grammar_list.each_pair do |level, val|
      grammar_list .concat val
    end
    grammar_list.each { |item|
      # binding.pry
      item[:id] =  Random.new_seed
    }
  rescue => e
    puts e.message

  end
  grammar_list
end

puts (get_twi "grammar_list.yml")[0]