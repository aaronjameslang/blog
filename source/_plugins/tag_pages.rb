module Jekyll
  class TagPageGenerator < Generator
    safe true
    priority :low

    def generate(site)
      tag_map = {}
      site.pages.each do |page|
        next if page.data['tags'].nil?
        normalize_tags(page.data['tags']).each do |tag|
          (tag_map[tag] ||= []) << page
        end
      end
      tag_map.each do |tag, pages|
        site.pages << TagPage.new(site, tag, pages)
      end
    end

    private

    def normalize_tags(raw)
      case raw
      when Array  then raw.map { |t| t.to_s.strip.downcase }.reject(&:empty?)
      when String then raw.strip.split.map(&:downcase).reject(&:empty?)
      else []
      end
    end
  end

  class TagPage < PageWithoutAFile
    def initialize(site, tag, tagged_pages)
      @site = site
      @base = site.source
      @dir  = "tags/#{tag}"
      @name = "index.html"
      process(@name)

      baseurl = site.config['baseurl']
      items = tagged_pages
        .select { |p| p.data['title'] }
        .sort_by { |p| p.data['title'].downcase }
        .map { |p| render_item(p, baseurl) }
        .join("\n")

      self.data = {
        'layout'      => 'page',
        'title'       => "Posts tagged \"#{tag}\"",
        'nav_exclude' => true,
        'tag'         => tag,
      }
      self.content = "<ul class=\"posts-list\">\n#{items}\n</ul>"
    end

    private

    def render_item(page, baseurl)
      pills = normalize_tags(page.data['tags'] || '').map do |t|
        %(<a href="#{baseurl}/tags/#{t}/" class="post-tag">#{t}</a>)
      end.join(' ')
      %(<li><a href="#{baseurl}#{page.url}">#{page.data['title']}</a> #{pills}</li>)
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
