require 'faraday'
require 'json'
require 'nokogiri'
require 'erb'
require 'yaml'
require 'pry'
require 'twitter'


BASE_HOME = __dir__

def get_existed_file_list(extension)
  subdir = ext = extension
  file_list = Dir["#{BASE_HOME}/#{subdir}/*.#{ext}"].map { |item| File.basename(item, ".#{ext}") }
end

def clearup_all_image
  file_list = get_existed_file_list("html")
  png_list  = get_existed_file_list("png")
  no_png    = file_list - png_list
  unless no_png.empty?
    str_list = no_png.join(",")
    use_phantomjs(str_list)
  else
    puts 'no new png need create'
  end

end

def use_phantomjs(url_list)
  begin
    puts "invoke phantomjs to generate png "
    exec("#{BASE_HOME}/node_modules/phantomjs/lib/phantom/bin/phantomjs #{BASE_HOME}/render_multi_url.js #{url_list}")
  rescue => e
    puts e.message
  end
end


clearup_all_image
