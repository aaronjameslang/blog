require 'nokogiri'
require 'json'
require 'securerandom'

module Jekyll
  module PageFilters
    def first_para_in_page(content)
      return nil if content.nil? || content.empty?
      return 'ERROR: content is not HTML' unless content.include?('<')
      doc = Nokogiri::HTML.fragment(content)
      doc.css('p').first&.text&.strip
    end

    def first_sentence_in_para(para_text)
      return nil if para_text.nil? || para_text.empty?
      match = para_text.match(/\A(.+?)([.!?]+)/m)
      return nil unless match
      "#{match[1].strip}#{match[2][0]}"
    end

    def first_sentence(content)
      para_text = first_para_in_page(content)
      return 'ERROR: no paragraph found' if para_text.nil?

      sentence = first_sentence_in_para(para_text)
      return "ERROR: no sentence found in: #{para_text.to_json}" if sentence.nil?

      sentence
    end

    def normalize_tags(raw)
      case raw
      when Array  then raw.map { |t| t.to_s.strip.downcase }.reject(&:empty?)
      when String then raw.strip.split.map(&:downcase).reject(&:empty?)
      else []
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::PageFilters) if defined?(Liquid)
