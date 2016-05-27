a = {
    a: [1, 2],
    b: {c: {d: [1, 2, 3]}}
}

require 'yaml'
File.open("test.txt", "w") do |file|
    file.write a.to_yaml
end