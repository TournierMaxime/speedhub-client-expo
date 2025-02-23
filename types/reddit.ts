interface MediaEmbed {
  content: string
  width: number
  scrolling: boolean
  height: number
}

interface SecureMedia {
  type: string
  oembed: {
    provider_url: string
    version: string
    title: string
    type: string
    thumbnail_width: number
    height: number
    width: number
    html: string
    author_name: string
    provider_name: string
    thumbnail_url: string
    thumbnail_height: number
    author_url: string
  }
}

interface SecureMediaEmbed {
  content: string
  width: number
  scrolling: boolean
  media_domain_url: string
  height: number
}

interface Media {
  type: string
  oembed: {
    provider_url: string
    version: string
    title: string
    type: string
    thumbnail_width: number
    height: number
    width: number
    html: string
    author_name: string
    provider_name: string
    thumbnail_url: string
    thumbnail_height: number
    author_url: string
  }
}

interface Reddits {
  data: {
    children: {
      data: Reddit
    }[]
  }
}

interface Reddit {
  approved_at_utc: null | undefined | string
  subreddit: string
  selftext: string
  author_fullname: string
  saved: boolean
  mod_reason_title: string
  gilded: number
  clicked: boolean
  title: string
  link_flair_richtext: string[]
  subreddit_name_prefixed: string
  hidden: boolean
  pwls: number
  link_flair_css_class: string
  downs: number
  top_awarded_type: null | undefined | string
  hide_score: boolean
  name: string
  quarantine: boolean
  link_flair_text_color: null | undefined | string
  upvote_ratio: number
  author_flair_background_color: null | undefined | string
  subreddit_type: string
  ups: number
  total_awards_received: number
  media_embed: MediaEmbed
  author_flair_template_id: null | undefined | string
  is_original_content: boolean
  user_reports: string[]
  secure_media: SecureMedia
  is_reddit_media_domain: boolean
  is_meta: boolean
  category: null | undefined | string
  secure_media_embed: SecureMediaEmbed
  link_flair_text: string
  can_mod_post: boolean
  score: number
  approved_by: null | undefined | string
  is_created_from_ads_ui: boolean
  author_premium: boolean
  thumbnail: string
  edited: boolean
  author_flair_css_class: null | undefined | string
  author_flair_richtext: string[]
  gildings: any
  content_categories: null | undefined | string
  is_self: boolean
  mod_note: null | undefined | string
  created: number
  link_flair_type: string
  wls: number
  removed_by_category: null
  banned_by: null | undefined | string
  author_flair_type: string
  domain: string
  allow_live_comments: boolean
  selftext_html: null | undefined | string
  likes: null | undefined | string
  suggested_sort: null | undefined | string
  banned_at_utc: null | undefined | string
  url_overridden_by_dest: string
  view_count: null | undefined | string
  archived: boolean
  no_follow: boolean
  is_crosspostable: boolean
  pinned: boolean
  over_18: boolean
  all_awardings: string[]
  awarders: string[]
  media_only: boolean
  can_gild: boolean
  spoiler: boolean
  locked: boolean
  author_flair_text: null | undefined | string
  treatment_tags: string[]
  visited: boolean
  removed_by: null | undefined | string
  num_reports: null | undefined | string
  distinguished: null | undefined | string
  subreddit_id: string
  author_is_blocked: boolean
  mod_reason_by: null | undefined | string
  removal_reason: null | undefined | string
  link_flair_background_color: null | undefined | string
  id: string
  is_robot_indexable: boolean
  report_reasons: null | undefined | string
  author: string
  discussion_type: null | undefined | string
  num_comments: number
  send_replies: boolean
  contest_mode: boolean
  mod_reports: string[]
  author_patreon_flair: boolean
  author_flair_text_color: null | undefined | string
  permalink: string
  stickied: boolean
  url: string
  subreddit_subscribers: number
  created_utc: number
  num_crossposts: number
  media: Media
  is_video: boolean
}

export { Reddits, Reddit }
