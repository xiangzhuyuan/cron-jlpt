class Jlpt
  class << self
    def get_all_words

    end
    def read_pdf(file_name)
      reader = PDF::Reader.new("./assets/#{}somefile.pdf")

      puts reader.pdf_version
      puts reader.info
      puts reader.metadata
      puts reader.page_count
    end
  end
end