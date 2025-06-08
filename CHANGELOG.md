# 📝 Changelog

_Last 50 meaningful changes (excluding version bumps). Auto-generated on each push to main._

---

**Date:** 2025-06-08 12:00:00 +0530  
**Commit:** [latest](https://github.com/dhruvinrsoni/cipher-alchemist/commit/latest)  
**Author:** Dhruvin Rupesh Soni

#### feat: Add comprehensive Phrase Suggestions system

Reason:
- Provide users with inspirational examples to easily get started with the cipher tool.
- Reduce complexity barrier for new users by offering curated, meaningful phrases.
- Enhance user experience with one-click phrase testing and exploration.

Changes:
- Implemented 12 balanced thematic groups (Power & Motivation, Achievement & Victory, Learning & Growth, Tech & Innovation, Health & Vitality, Spiritual & Wisdom, Creative & Artistic, Focus & Excellence, Nature & Renewal, Problem Solving, Digital & Future, Celebration & Joy).
- Optimized suggestion system: 4 phrases per group instead of 8 mixed suggestions for better focus.
- Enhanced user experience with cohesive thematic groups and reduced cognitive load.
- Improved refresh functionality to show complete thematic groups for better discovery.
- Created interactive suggestion chips with smooth animations and visual feedback.
- Integrated one-click phrase insertion with automatic strength analysis.
- Implemented collapsible UI section to optimize screen space.
- Added keyboard navigation and accessibility support.

Impact:
- Significantly improved user onboarding and discovery experience.
- Reduced friction for users unsure what phrases to test.
- Enhanced engagement through inspirational, meaningful examples.
- Maintained clean, professional UI while adding substantial functionality.

Test:
- Verified all 48 suggestions work correctly with cipher transformations across 12 thematic groups.
- Tested responsive design across mobile and desktop devices with optimized 4-suggestion layout.
- Confirmed accessibility features and keyboard navigation.
- Validated smooth animations and visual feedback systems.
- Verified thematic group coherence and reduced cognitive load for users.

Docs:
- Updated README.md, DEVELOPMENT.md, and RELEASES.md with feature documentation.
- Added technical implementation details and usage examples.

---

**Date:** 2025-06-03 23:54:08 +0530  
**Commit:** [5898b1e](https://github.com/dhruvinrsoni/cipher-alchemist/commit/5898b1eb5b644416cc62adf169430a66bd3f8e19)  
**Author:** Dhruvin Rupesh Soni

#### docs: Rewrite README with modern structure

Reason:
- Improve project documentation for better user onboarding and networking.
- Highlight key features, deployment steps, and technical architecture.

Changes:
- Recreated README.md with professional sections and enhanced branding.
- Added live demo links, contributing guidelines, and project status.
- Detailed technical architecture and design philosophy.

Impact:
- Enhanced user experience with clear and engaging documentation.
- Improved project visibility and networking opportunities.

Test:
- Verified README.md formatting and content accuracy.
- Checked links and deployment instructions for correctness.

Docs:
- README.md updated with comprehensive sections and modern structure.

Compatibility:
- No breaking changes; backward compatibility maintained.

Dependencies:
- No new dependencies introduced.

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-03 23:50:57 +0530  
**Commit:** [60e594e](https://github.com/dhruvinrsoni/cipher-alchemist/commit/60e594e7589afcc6a43d36b66e505ffc8ea67303)  
**Author:** Dhruvin Rupesh Soni

#### feat: Standardize icons and enhance branding

Reason:
- Improve consistency in icon naming for PWA compliance.
- Enhance project branding and documentation for better networking.

Changes:
- Standardized icon file names from `icon-*.png` to `favicon-*.png`.
- Updated page title and meta descriptions with engaging branding and `@dhruvinrsoni` handle.
- Enhanced PWA manifest with full descriptive name and added description field.
- Recreated README.md with modern documentation structure.
- Removed duplicate and obsolete icon files.

Impact:
- Improved branding consistency across the project.
- Enhanced user experience with better documentation and metadata.
- Simplified file structure by removing unnecessary files.

Test:
- Verified icon references in HTML, manifest.json, and service-worker.js.
- Validated syntax for all modified files.
- Checked for remaining `icon-` references; none found.

Docs:
- README.md completely rewritten with professional sections.
- Updated deployment and usage instructions.

Compatibility:
- No breaking changes; backward compatibility maintained.

Dependencies:
- No new dependencies introduced.

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-03 23:32:28 +0530  
**Commit:** [0dde88d](https://github.com/dhruvinrsoni/cipher-alchemist/commit/0dde88ded32931a435dbc900420c920a48ea9b66)  
**Author:** Dhruvin Rupesh Soni

#### docs: enhance website metadata and SEO optimization

Reason:
- Improve website discoverability and presentation in search results
- Align branding consistently with "@dhruvinrsoni" handle

Changes:
- Enhanced meta tags with more descriptive content and emojis
- Improved title and description for better SEO performance
- Refined social media sharing metadata for Twitter and Open Graph
- Reformatted HTML structure for better readability
- Cleared redundant content from git-commit-template.txt

Impact:
- Better search engine visibility and ranking potential
- Improved appearance when shared on social media platforms
- Clearer communication of the app's purpose and features

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-03 23:19:08 +0530  
**Commit:** [ba562d3](https://github.com/dhruvinrsoni/cipher-alchemist/commit/ba562d30ddaf9f39e7d464dacbcdd6165d1c3d9c)  
**Author:** Dhruvin Rupesh Soni

#### refactor: standardize icon file naming to favicon prefix

Reason:
- Inconsistent icon naming convention between favicon.ico and icon-*.png files
- Need unified naming scheme for better file organization and clarity
- Align with standard favicon naming conventions

Changes:
- Updated icon-192.png references to favicon-192.png in all files
- Updated icon-512.png references to favicon-512.png in all files
- Modified index.html meta tags for OpenGraph and Twitter cards
- Updated manifest.json PWA icon sources
- Updated service-worker.js cache array with new icon paths

Impact:
- Improves file naming consistency across the project
- Maintains PWA functionality with proper icon references
- Ensures social media sharing uses correct icon paths
- No breaking changes to functionality or user experience

Files Modified:
- index.html: 3 icon reference updates
- manifest.json: 2 PWA icon source updates
- service-worker.js: 2 cache path updates

Compatibility:
- Requires renaming physical icon files to match new references
- No impact on existing functionality once files are renamed
- PWA installation and social sharing will work seamlessly

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-03 22:49:43 +0530  
**Commit:** [2f6a92b](https://github.com/dhruvinrsoni/cipher-alchemist/commit/2f6a92bef59156734e9f62091649de7450cee49d)  
**Author:** Dhruvin Rupesh Soni

#### feat: implement collapsible UI sections for better user experience

Reason:
- Improve information organization and reduce visual clutter
- Enhance user experience by allowing content to be expanded/collapsed as needed

Changes:
- Added collapsible sections for app description and transformation steps
- Implemented keyboard navigation support for accessibility
- Enhanced styling with smooth animations and responsive design
- Updated the example transformation to show more complex output
- Added ARIA attributes for better screen reader support

Impact:
- Reduces initial cognitive load by hiding non-essential information
- Improves mobile experience by allowing users to focus on relevant content
- Enhances accessibility through keyboard navigation and ARIA support

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-03 12:27:44 +0530  
**Commit:** [b4f9672](https://github.com/dhruvinrsoni/cipher-alchemist/commit/b4f9672f61adcb8a4a2a877d8fda2d386d8a4906)  
**Author:** Dhruvin Rupesh Soni

#### feat: enhance UI with app description and interactive example

Reason:
- Application lacked clear description and interactive elements
- Users needed better understanding of the app's purpose and functionality
- PWA support was incomplete without proper favicons

Changes:
- Added app description section with tagline and feature highlights
- Implemented interactive example phrase with animation effects
- Added favicon files (192px and 512px) for PWA support
- Enhanced styles with responsive design for description section
- Improved dark theme support for new UI elements

Impact:
- Improves first-time user experience and understanding
- Provides clear value proposition through feature highlights
- Enables better PWA integration on mobile devices
- Maintains accessibility and theme consistency

---

**Date:** 2025-06-03 04:05:21 +0530  
**Commit:** [c91ae82](https://github.com/dhruvinrsoni/cipher-alchemist/commit/c91ae82086e2dbcf386f6c6f89bb46eddc67b2ad)  
**Author:** Dhruvin Rupesh Soni

#### fix: improve changelog generation to properly handle multiline commit bodies

Reason:
- Previous implementation had issues parsing commit bodies with multiple lines
- Complex commit messages were truncated or incorrectly formatted
- The changelog was missing important details from detailed commit bodies

Changes:
- Refactored git log processing to handle each commit individually
- Changed from single-line parsing to a more robust approach using git show
- Added proper handling of multiline commit bodies with formatting preserved
- Created test_commit_body.bat script to validate the new approach
- Fixed formatting issue in update-version.yml workflow file

Impact:
- Changelog now displays complete commit messages with proper formatting
- Improved readability and completeness of project documentation
- Better preservation of commit history and context for future reference

CI/CD:
- Enhanced GitHub Actions workflow reliability
- No changes to build process or deployment needed

---

**Date:** 2025-06-03 03:56:06 +0530  
**Commit:** [5eba9fc](https://github.com/dhruvinrsoni/cipher-alchemist/commit/5eba9fce290cc2e0fb9446e58b30fa2ed4ff5595)  
**Author:** Dhruvin Rupesh Soni

#### fix: improve changelog generation with robust parsing

Reason:
- Previous changelog format had parsing issues due to pipe delimiter conflicts
- Several malformed entries appeared in the CHANGELOG.md output
- Error handling was insufficient, causing potential parsing failures

Changes:
- Changed git log delimiter from pipe (|) to tilde (~) to avoid conflicts
- Added validation to ensure all required fields are present before processing
- Improved error handling by redirecting stderr to /dev/null
- Enhanced empty value checks with more specific conditions
- Fixed line break issue in CHANGELOG.md format

Impact:
- More reliable and consistent changelog generation
- Cleaner, properly formatted changelog entries
- Prevents broken or incomplete entries from appearing in the log
- Ensures proper display of commit information for project transparency

---

**Date:** 2025-06-03 03:46:33 +0530  
**Commit:** [57e4c06](https://github.com/dhruvinrsoni/cipher-alchemist/commit/57e4c066a3c771c9a05a665e37624ba5b8a5c6b2)  
**Author:** Dhruvin Rupesh Soni

#### chore: refactor version update workflow automation

- Reversed workflow triggers to enable automatic versioning
- Renamed old workflow to "Update Version Old" and made it manual-only
- Restored automatic versioning on main branch pushes
- Removed footer line from auto-generated changelog

Impact: Improves CI/CD by automating version updates on merge to main
while keeping the manual option available if needed. Simplifies the
changelog format by removing the redundant auto-generation notice.

---

**Date:** 2025-06-03 03:40:49 +0530  
**Commit:** [33de212](https://github.com/dhruvinrsoni/cipher-alchemist/commit/33de2123f0630626641fe7ff370d3073b5552b7c)  
**Author:** Dhruvin Rupesh Soni

#### docs: add auto-generation notice to changelog file

This change adds a disclaimer at the end of the CHANGELOG.md file
indicating that it is auto-generated by GitHub Actions and should
not be edited manually.

Impact:
- Improves clarity for contributors about file maintenance
- Prevents manual edits that would be overwritten by automation

Docs:
- Enhances self-documentation of the changelog generation process

---

**Date:** 2025-06-03 03:34:11 +0530  
**Commit:** [77b7fb0](https://github.com/dhruvinrsoni/cipher-alchemist/commit/77b7fb0870328c0d8843501fd77859330f31fcb3)  
**Author:** Dhruvin Rupesh Soni

#### chore: make version update workflow manually triggered

Reason:
- Changed the update-version workflow to be manually triggered
- Removed automatic triggers on push to main branch

Impact:
- Version updates will now require manual intervention
- Provides more control over when version updates occur
- Prevents unwanted automatic version updates

CI/CD:
- Modified GitHub Actions workflow configuration
- Workflow now uses workflow_dispatch instead of push event

---

**Date:** 2025-06-03 03:20:29 +0530  
**Commit:** [b4aea25](https://github.com/dhruvinrsoni/cipher-alchemist/commit/b4aea25c962bc49367a678cb0c8139a06de3098d)  
**Author:** Dhruvin Rupesh Soni

#### feat(docs): enhance changelog with dual format generation

Reason:
- Previous CHANGELOG format was malformed with parsing issues
- Commit entries were not properly separated and had broken links
- Need for both detailed and simplified changelog formats

Changes:
- Add new CHANGELOG_CLEAN.md with properly formatted entries
- Update workflow to generate both detailed and clean versions
- Fix hyperlinks in changelog to properly point to GitHub commits
- Modify manifest.json to use PNG icons instead of favicon.ico
- Document workflow functionality in README.md

Impact:
- Improves project documentation readability and maintenance
- Provides better navigation and reference capabilities
- Ensures proper markdown rendering for GitHub Pages

Test:
- Verified both changelog formats generate correctly
- Confirmed hyperlinks resolve to proper commit URLs
- Validated workflow execution with test commits

---

**Date:** 2025-06-03 02:33:34 +0530  
**Commit:** [817e003](https://github.com/dhruvinrsoni/cipher-alchemist/commit/817e003c17b5a00ed0162acb5fef941c2ed082b3)  
**Author:** Dhruvin Rupesh Soni

#### style: enhance CHANGELOG.md formatting for better readability

Reason:
- Previous CHANGELOG format was basic and lacked visual hierarchy
- Improved format provides better navigation and reference capabilities

Changes:
- Added newline after the title for proper markdown rendering
- Restructured commit entries with clear section separators
- Added hyperlinks to commit hashes for direct GitHub navigation
- Improved formatting of date, author, and commit information
- Enhanced overall readability with better markdown structure

---

**Date:** 2025-06-03 02:26:46 +0530  
**Commit:** [a8d13cb](https://github.com/dhruvinrsoni/cipher-alchemist/commit/a8d13cbc260da453b7bd896f407f0a44d1984448)  
**Author:** Dhruvin Rupesh Soni

#### feat: enhance PWA capabilities and improve SEO metadata

- Add comprehensive meta tags for better SEO performance and social sharing
- Improve Progressive Web App (PWA) support with proper viewport settings
- Add mobile and Apple-specific meta tags for better mobile experience
- Include OpenGraph and Twitter card metadata for improved social sharing
- Enhance accessibility with aria-live attribute on version display
- Improve page structure with visual separator in footer
- Optimize script loading with defer attribute

---

**Date:** 2025-06-03 01:48:32 +0530  
**Commit:** [53861e0](https://github.com/dhruvinrsoni/cipher-alchemist/commit/53861e0a0bfdcc7455dc7f3c50b13f56f5199245)  
**Author:** Dhruvin Rupesh Soni

#### refactor: update footer to use static attribution information

- Removed dynamic footer-built element and related JavaScript logic
- Added static attribution with GitHub profile link directly in HTML
- Simplified footer rendering by removing unnecessary DOM manipulations
- Improved footer appearance with clearer author attribution

This change maintains the same information display while reducing
JavaScript complexity and making the footer structure more maintainable.

---

**Date:** 2025-06-03 01:33:41 +0530  
**Commit:** [5341ae7](https://github.com/dhruvinrsoni/cipher-alchemist/commit/5341ae721fc95d8608f54be72372b8729cc72cea)  
**Author:** Dhruvin Soni

#### feat: add automated CHANGELOG generation

Summary:
Enhance the version update workflow to automatically generate and commit a CHANGELOG.md file alongside version.txt on each push to main.

Changes:
- Add new step to generate CHANGELOG.md containing last 50 meaningful commits
- Update git commit process to include CHANGELOG.md in the commit
- Modify commit message to reflect both files being updated

Why:
This change improves project documentation by maintaining an auto-updated changelog, making it easier for users and contributors to track meaningful changes to the project without manual intervention.

Technical Details:
- CHANGELOG excludes version update commits to prevent noise
- Format includes commit message, hash, author, and date for comprehensive history

---

**Date:** 2025-06-03 01:16:38 +0530  
**Commit:** [655fc9c](https://github.com/dhruvinrsoni/cipher-alchemist/commit/655fc9c0e0aad098a0acbf24180b673659269be9)  
**Author:** Dhruvin Soni

#### refactor: improve version display and metadata handling

This commit implements a more robust version display system with the following improvements:

- Add meta tag in HTML for version injection during build time
- Refactor version display logic to first check meta tag, then fall back to version.txt
- Split version display into separate elements for better mobile presentation
- Simplify the format in update-version.yml workflow
- Restructure footer to prioritize version information

These changes make the version display more maintainable and create a clearer
separation between version metadata and attribution. The system now handles
both build-time injection and runtime fetching, improving reliability across
deployment scenarios.

---

**Date:** 2025-06-03 00:59:57 +0530  
**Commit:** [b21ec7c](https://github.com/dhruvinrsoni/cipher-alchemist/commit/b21ec7c30532f16cc9d45eb8813238f3fc1c9f6a)  
**Author:** Dhruvin Soni

#### 🔧 chore: enhance version format with IST time and better display

- Add India Standard Time (IST) format to version information
- Improve formatting with emojis and attribution
- Store commit hash and time as step outputs for reuse
- Update commit message for version updates to be more descriptive

---

**Date:** 2025-06-03 00:42:08 +0530  
**Commit:** [520e67f](https://github.com/dhruvinrsoni/cipher-alchemist/commit/520e67f5974cd2c454cf20f72a2501ee92da0630)  
**Author:** Dhruvin Soni

#### feat: Add version tracking system and GitHub project link

Reason:
- Implement version tracking to provide transparency about which build users are interacting with
- Improve project discoverability by adding a link to the GitHub repository

Impact:
- Version information now displays in the footer of the application
- Automated GitHub Action will update version.txt on each commit to main
- Users can easily navigate to the project repository

Testing:
- Verified version.txt is properly displayed in the UI
- Confirmed GitHub Actions workflow updates version correctly on push

Note:
- Initial version is set to "dev" and will be updated by the workflow
- No breaking changes or new dependencies introduced

---

**Date:** 2025-06-02 22:49:10 +0530  
**Commit:** [0c3b796](https://github.com/dhruvinrsoni/cipher-alchemist/commit/0c3b796d5e3c9dc2d2db3a9e5dfae337823438de)  
**Author:** Dhruvin Soni

#### fix: Offline support for Cipher Alchemist

Enable offline support by caching essential files in the service worker.
service worker is currently caching only absolute paths (e.g., index.html, styles.css). On GitHub Pages or similar static hosts, your files are likely served from a subdirectory (e.g., /cipher-alchemist/index.html), not from the root /.

This means the service worker can't find or cache the files correctly, so offline mode fails.

How to fix:

Use relative paths (e.g., index.html, styles.css) in cache.addAll.
Or, use the correct subdirectory path (e.g., /cipher-alchemist/index.html).
update your service worker to cache the correct paths for GitHub Pages deployment.

Signed-off-by: Dhruvin Soni <dhruvin.soni@zebra.com>

---

**Date:** 2025-06-02 01:07:29 +0530  
**Commit:** [0e281b6](https://github.com/dhruvinrsoni/cipher-alchemist/commit/0e281b6b528db130de628ad218accf046e5a0d96)  
**Author:** Dhruvin Soni

#### Fix name in main page and add icons

---

**Date:** 2025-06-02 01:01:23 +0530  
**Commit:** [66b43a5](https://github.com/dhruvinrsoni/cipher-alchemist/commit/66b43a54e211160b947f368b2fd9e7bb80170b59)  
**Author:** Dhruvin Soni

#### Replace PNG icons with favicon.ico in manifest.json

Standardize PWA icons by using the existing favicon.ico instead of
separate PNG files to ensure consistent branding between browser
and PWA installations.

---

**Date:** 2025-06-02 00:53:30 +0530  
**Commit:** [928a41e](https://github.com/dhruvinrsoni/cipher-alchemist/commit/928a41ef958842b7a618806ece49667e27572f42)  
**Author:** Dhruvin Soni

#### fix(service-worker): implement immediate cache refresh on update

Improve the service worker to ensure new deployments are immediately
available to users by:
- Adding skipWaiting() to activate updates without delay
- Implementing proper activate event handler to clear old caches
- Adding client claiming to update all open tabs

This resolves the issue where users continued seeing outdated content
after new deployments until manually refreshing the page.

---

**Date:** 2025-06-02 00:47:41 +0530  
**Commit:** [83d2f5c](https://github.com/dhruvinrsoni/cipher-alchemist/commit/83d2f5c87b1f9f483e34a6eea5befef1df2254af)  
**Author:** Dhruvin Soni

#### fix: resolve textarea overflow and improve mobile responsiveness

---

**Date:** 2025-06-02 00:41:30 +0530  
**Commit:** [50831ef](https://github.com/dhruvinrsoni/cipher-alchemist/commit/50831efcccc827905477d26b6ffc3b2b64faadc5)  
**Author:** Dhruvin Soni

#### fix: improve theme toggle functionality for mobile devices

- Refactor theme system to use explicit theme classes
- Enhance mobile UI with fixed positioning for theme toggle button
- Add flexbox alignment for better button appearance on small screens
- Fix theme persistence by improving localStorage handling

---

**Date:** 2025-06-02 00:34:21 +0530  
**Commit:** [ad8a7f9](https://github.com/dhruvinrsoni/cipher-alchemist/commit/ad8a7f9fb467f667e6de1c6dda651618ff3a0511)  
**Author:** Dhruvin Soni

#### Fix theme toggle button functionality and styles

✨ Improvements:
• Implemented proper theme toggling system with persistent preferences
• Repositioned toggle button to top-right with intuitive moon/sun emoji
• Completely refactored CSS to use variables for better maintainability
• Carefully selected dark theme colors for optimal contrast and readability
• Added localStorage support to remember user theme preferences
• Updated footer with proper copyright information and styling

---

**Date:** 2025-06-02 00:20:48 +0530  
**Commit:** [55837c6](https://github.com/dhruvinrsoni/cipher-alchemist/commit/55837c6131d8a27428121e6efd07cf5683bf7f4d)  
**Author:** Dhruvin Soni

#### Update app name,url,PWA,config,docs,service worker

This commit makes several key improvements to the application:

- Rename application from "Password Generator" to "Cipher Alchemist"
- Add proper PWA icons (192px and 512px versions)
- Update manifest.json with new app name and icon paths
- Revise service worker cache name to match new app identity
- Enhance README.md with detailed deployment instructions
- Update documentation to reflect the correct GitHub Pages URL
- Add author information to the footer
- Expand feature descriptions in documentation

These changes improve the application's branding, PWA capabilities,
and documentation clarity.

---

**Date:** 2025-06-01 23:54:26 +0530  
**Commit:** [9314ffa](https://github.com/dhruvinrsoni/cipher-alchemist/commit/9314ffa4e147df3199b9f4c0d849cfd158b7024d)  
**Author:** Dhruvin Soni

#### Update app name and title with icon link

UPdate the title to "Cipher Alchemist" and the app name to "Cipher Alchemist".
Also, add a favicon link to the HTML file.

---

**Date:** 2025-06-01 23:33:48 +0530  
**Commit:** [10f4f28](https://github.com/dhruvinrsoni/cipher-alchemist/commit/10f4f28ee06add0a5e4c59ef7b5865513da27ecd)  
**Author:** Dhruvin Soni

#### Add favicon.ico files

added the favicon ico files to the repository

---

**Date:** 2025-06-01 23:17:07 +0530  
**Commit:** [dfe79e9](https://github.com/dhruvinrsoni/cipher-alchemist/commit/dfe79e9de0dbe8b1d0add90da9b429f6a28f2b56)  
**Author:** Dhruvin Rupesh Soni

#### Initial commit

---

