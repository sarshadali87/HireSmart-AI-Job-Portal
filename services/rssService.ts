// FIX: Corrected import path to be relative to the project root
import type { Job } from '../types';

// A mock RSS feed XML string. This is used to avoid actual network requests and CORS issues in the demo environment.
// In a real application, you would fetch this from a URL.
const mockRssFeed = `
<rss version="2.0">
<channel>
  <title>External Job Feed</title>
  <link>https://example.com/jobs</link>
  <description>Latest job openings from external sources.</description>
  <item>
    <title>Senior DevOps Engineer - Example Corp</title>
    <link>https://example.com/job/123</link>
    <description>We are looking for a DevOps Engineer to help us build functional systems that support our business needs. The ideal candidate will be a team player with a keen eye for detail and problem-solving skills.</description>
    <pubDate>Mon, 22 Jul 2024 10:00:00 GMT</pubDate>
    <category>Tech</category>
  </item>
  <item>
    <title>UX/UI Designer - Creative Solutions</title>
    <link>https://example.com/job/124</link>
    <description>Creative Solutions is seeking a talented UX/UI designer to create amazing user experiences. The ideal candidate should have a strong portfolio of successful UX and other technical projects.</description>
    <pubDate>Sun, 21 Jul 2024 15:30:00 GMT</pubDate>
    <category>Design</category>
  </item>
  <item>
    <title>Content Marketing Manager - Growth Co.</title>
    <link>https://example.com/job/125</link>
    <description>We're hiring a Content Marketing Manager to lead our content strategy. You will be responsible for creating, improving and maintaining content to achieve our business goals.</description>
    <pubDate>Sat, 20 Jul 2024 09:00:00 GMT</pubDate>
    <category>Marketing</category>
  </item>
</channel>
</rss>
`;

/**
 * Fetches and parses jobs from an RSS feed.
 * @returns A promise that resolves to an array of Job objects.
 */
export const fetchJobsFromRSS = (): Promise<Job[]> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(mockRssFeed, "application/xml");
        
        const errorNode = xmlDoc.querySelector("parsererror");
        if (errorNode) {
          console.error("Error parsing XML:", errorNode);
          reject(new Error("Failed to parse RSS feed."));
          return;
        }

        const items = xmlDoc.querySelectorAll("item");
        const jobs: Job[] = Array.from(items).map((item, index) => {
          const title = item.querySelector("title")?.textContent || 'No title';
          const description = item.querySelector("description")?.textContent || 'No description';
          const pubDate = item.querySelector("pubDate")?.textContent || new Date().toISOString();
          const category = item.querySelector("category")?.textContent || 'General';

          // Attempt to parse company name from title
          const titleParts = title.split(' - ');
          const companyName = titleParts.length > 1 ? titleParts.pop()!.trim() : 'External Source';
          const jobTitle = titleParts.join(' - ');
          
          return {
            id: `rss-${index}-${new Date(pubDate).getTime()}`,
            title: jobTitle,
            description: description.trim(),
            category: ['Tech', 'Design', 'Marketing'].includes(category) ? category : 'General',
            company: {
              id: 999, // A generic ID for external companies
              name: companyName,
              logoUrl: `https://picsum.photos/seed/${encodeURIComponent(companyName)}/100`, // Generate a placeholder logo
            },
            postedAt: new Date(pubDate).toISOString().split('T')[0],
            isExternal: true,
            sourceUrl: item.querySelector("link")?.textContent || '#',
            location: 'Various',
          };
        });
        
        resolve(jobs);
      } catch (error) {
        console.error("Error in fetchJobsFromRSS:", error);
        reject(error);
      }
    }, 1500); // 1.5 second delay
  });
};
