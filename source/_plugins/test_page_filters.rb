require_relative 'page_filters'

class TestPageFilters
  include Jekyll::PageFilters

  def run_tests
    puts "Running page_filters tests...\n"

    puts "Testing first_para_in_page:"
    test_first_para_simple
    test_first_para_with_heading
    test_first_para_empty
    test_first_para_not_html

    puts "\nTesting first_sentence_in_para:"
    test_sentence_simple
    test_sentence_newline
    test_sentence_question
    test_sentence_exclamation
    test_sentence_no_punctuation

    puts "\nTesting first_sentence (integration):"
    test_integration_simple
    test_integration_with_heading

    puts "\nAll tests passed!"
  end

  private

  # first_para_in_page tests
  def test_first_para_simple
    content = '<p>This is text.</p>'
    result = first_para_in_page(content)
    assert_equal 'This is text.', result
  end

  def test_first_para_with_heading
    content = '<h1>Heading</h1><p>Paragraph text.</p>'
    result = first_para_in_page(content)
    assert_equal 'Paragraph text.', result
  end

  def test_first_para_empty
    content = '<h1>Only heading</h1>'
    result = first_para_in_page(content)
    assert_equal nil, result
  end

  def test_first_para_not_html
    content = 'This is plain text with no HTML'
    result = first_para_in_page(content)
    assert_equal 'ERROR: content is not HTML', result
  end

  # first_sentence_in_para tests
    def test_sentence_single
    text = 'This is the first sentence.'
    result = first_sentence_in_para(text)
    assert_equal 'This is the first sentence.', result
  end

  def test_sentence_simple
    text = 'This is the first sentence. This is the second.'
    result = first_sentence_in_para(text)
    assert_equal 'This is the first sentence.', result
  end

    def test_sentence_newline
    text = 'This is the first\nsentence.This is the second.'
    result = first_sentence_in_para(text)
    assert_equal 'This is the first sentence.', result
  end

  def test_sentence_question
    text = 'Is this a question? Yes.'
    result = first_sentence_in_para(text)
    assert_equal 'Is this a question?', result
  end

  def test_sentence_exclamation
    text = 'What an exclamation! More text.'
    result = first_sentence_in_para(text)
    assert_equal 'What an exclamation!', result
  end

  def test_sentence_no_punctuation
    text = 'No punctuation here'
    result = first_sentence_in_para(text)
    assert_equal nil, result
  end

  # Integration tests
  def test_integration_simple
    content = '<p>Simple sentence. More.</p>'
    result = first_sentence(content)
    assert_equal 'Simple sentence.', result
  end

  def test_integration_with_heading
    content = '<h1>Title</h1><p>Real content here? Yes.</p>'
    result = first_sentence(content)
    assert_equal 'Real content here?', result
  end

  def assert_equal(expected, actual)
    if expected != actual
      raise "Expected '#{expected.inspect}', got '#{actual.inspect}'"
    end
  end
end

TestPageFilters.new.run_tests if __FILE__ == $0
