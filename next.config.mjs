import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.com',
        pathname: '/docs/images/products/**',
      },
    ],
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkToc],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behaviour: 'append',
          properties: {
            ariaHidden: true,
            tabIndex: -1,
            className: 'hash-link',
          },
        },
      ],
    ],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
