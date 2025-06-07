# 📝 Changelog

_Last 50 meaningful changes (excluding version bumps). Auto-generated on each push to main._

---

**Date:** 2025-06-08 00:39:33 +0530  
**Commit:** [b3b12ab](https://github.com/dhruvinrsoni/cipher-alchemist/commit/b3b12abcd9a05d73c23eef6977bbbe92962b85bd)  
**Author:** Dhruvin Rupesh Soni

#### chore: remove deprecated release management scripts

This commit removes obsolete release management scripts, workflow files, and
documentation that are no longer needed in the project. These files were
experimental or replaced by a more streamlined CI/CD process.

- Removed multiple GitHub workflow files that were redundant
- Deleted various batch scripts for release validation and testing
- Removed temporary markdown files and changelog drafts
- Cleaned up version management scripts (both .bat and .sh)

Impact:
- CI/CD: Simplified by removing redundant workflow files
- VCS: Reduced repository size by removing unnecessary files
- Code quality: Improved by removing unmaintained scripts

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-06 08:53:55 +0530  
**Commit:** [2c6a762](https://github.com/dhruvinrsoni/cipher-alchemist/commit/2c6a76237db8205a12d5db1b24e802593aaf6582)  
**Author:** Dhruvin Rupesh Soni

#### feat: implement release management infrastructure

This commit establishes a comprehensive release management system with the following components:

- GitHub Actions workflows for automated deployment, version management, and rollback processes
- Documentation detailing the modular release architecture and workflows
- Batch and shell scripts for local release validation and testing
- Version management tools supporting release validation and versioning

Impact:
- Improves CI/CD automation for release processes
- Standardizes version management across the project
- Provides tools for both automated and manual release workflows

Dependencies:
- Adds package.json for version tracking and dependencies

Testing:
- Multiple validation scripts added for release testing

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-05 00:13:20 +0530  
**Commit:** [99583ed](https://github.com/dhruvinrsoni/cipher-alchemist/commit/99583ed552330d776b569f83e64b1d98a282da1a)  
**Author:** Dhruvin Rupesh Soni

#### docs: Consolidate documentation structure and protect workflows

BREAKING CHANGES: Removed 6 documentation files and 3 validation scripts

Reason:
• Scattered documentation across 8 .md files created maintenance overhead
• Duplicate validation scripts led to inconsistent release processes
• GitHub Actions workflows were recreating deleted documentation files
• Complex file structure hindered developer onboarding and project navigation

Changes Made:

Documentation Restructure (8 → 4 files):
• Consolidated MODULAR-RELEASE-ARCHITECTURE.md → DEVELOPMENT.md
• Merged RELEASE-v1.0.0.md + RELEASE_NOTES.md + ROLLBACK_NOTES.md → RELEASES.md
• Removed SIMPLIFICATION-SUMMARY.md (content integrated into DEVELOPMENT.md)
• Enhanced README.md with cross-references and improved navigation
• Updated CHANGELOG.md validation system descriptions

Script Consolidation (3 → 1 unified tool):
• Merged quick-release.bat + validate-release.bat + release-v1.0.0.bat → release-validator.bat
• Added version override capability and enhanced error reporting
• Improved validation coverage with comprehensive functionality

Workflow Protection (4 steps across 3 files):
• .github/workflows/create-tag-release.yml: Protected changelog generation step
• .github/workflows/deployment-status.yml: Protected status report generation
• .github/workflows/rollback.yml: Protected rollback notes and release creation steps
• Added `if: false` conditions with explanatory comments to prevent file recreation

Visual Documentation Structure:
Previous (8 files):                    Current (4 files):
 ├── README.md                         ├── README.md (enhanced)
 ├── CHANGELOG.md                      ├── CHANGELOG.md (updated)
 ├── MODULAR-RELEASE-ARCHITECTURE.md   ├── DEVELOPMENT.md (comprehensive)
 ├── RELEASE-v1.0.0.md                 └── RELEASES.md (consolidated)
 ├── RELEASE_NOTES.md
 ├── ROLLBACK_NOTES.md
 ├── SIMPLIFICATION-SUMMARY.md
 └── [various .bat scripts]           → release-validator.bat (unified)

Impact:
• Reduced documentation maintenance overhead by 50%
• Improved developer onboarding with centralized technical guide
• Enhanced project navigation with cross-referenced documentation
• Streamlined release validation process with unified tooling
• Protected CI/CD workflows from recreating deleted files
• Improved code quality through consolidated validation scripts
• Enhanced VCS history clarity with structured file organization

Test:
• Validated all cross-references between documentation files
• Confirmed workflow protection prevents file recreation
• Tested unified validation script functionality
• Verified content preservation during consolidation

Compatibility:
• Backward compatible: All essential information preserved
• Workflow protection maintains existing CI/CD functionality
• Enhanced documentation structure improves accessibility
• Unified validation script maintains all previous capabilities

Docs:
• Created comprehensive DEVELOPMENT.md with technical architecture
• Consolidated RELEASES.md with complete release history
• Enhanced README.md with improved navigation
• Updated CHANGELOG.md with accurate validation descriptions
• Added cross-references between all documentation files

Files Changed:
• Modified: .github/workflows/create-tag-release.yml, deployment-status.yml, rollback.yml
• Modified: CHANGELOG.md, README.md
• Created: DEVELOPMENT.md, RELEASES.md, release-validator.bat
• Deleted: 6 .md files, 3 .bat scripts

This consolidation significantly improves project maintainability while
preserving all critical information and protecting existing workflows.

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-04 03:39:14 +0530  
**Commit:** [5434fa5](https://github.com/dhruvinrsoni/cipher-alchemist/commit/5434fa58dfbbb365e04de6b4434594718af7f781)  
**Author:** Dhruvin Rupesh Soni

#### feat: add real-time password strength analyzer with visualization

This commit implements a comprehensive password strength analysis system
with interactive visualization to improve user security awareness.

Key changes:
- Added circular progress meter showing overall password strength
- Implemented multi-criteria strength analysis (length, character variety)
- Created interactive tooltips explaining each security criterion
- Added real-time feedback as users type their phrase
- Implemented color-coded strength levels from weak to excellent
- Enhanced documentation with detailed password security guidelines

Impact:
- Users now receive immediate visual feedback on password strength
- Security education is improved through interactive tooltips
- Better UX with responsive design and smooth animations

Dependencies:
- No new external dependencies added

Test:
- Verified strength calculation with various password inputs
- Confirmed responsive design works on mobile and desktop

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-04 03:01:23 +0530  
**Commit:** [6a6b12f](https://github.com/dhruvinrsoni/cipher-alchemist/commit/6a6b12f5697e109a93ed0c0409f9fe3980fa3846)  
**Author:** Dhruvin Rupesh Soni

#### fix: Preserve workflow files during rollback operations

Enhances the rollback workflow to protect GitHub Actions files
from being overwritten during rollback operations.

- Added preview of files affected by rollback
- Modified rollback process to exclude .github/workflows directory
- Ensures workflow files are preserved in both hard and soft rollbacks
- Added explicit notifications about protected elements
- Prevents potential permission issues after rollback operations

Impact: Improves reliability of the rollback process by maintaining
CI/CD infrastructure integrity regardless of rollback type.

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-04 02:52:18 +0530  
**Commit:** [702fac2](https://github.com/dhruvinrsoni/cipher-alchemist/commit/702fac23c6136fcac2cdbe43f30823e4dfe7e045)  
**Author:** Dhruvin Rupesh Soni

#### 🔧 Fix deployment-status.yml formatting and add timestamp-based artifact naming

- Fix YAML syntax error where two steps were merged on one line
- Add timestamp generation for unique artifact naming
- Update artifact upload to use actions/upload-artifact@v4
- Implement IST timezone timestamp format: YYYYMMDD-HHMMSS

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-04 02:38:08 +0530  
**Commit:** [ccce3e3](https://github.com/dhruvinrsoni/cipher-alchemist/commit/ccce3e31c326d8641126cb0a546d2366865f42e4)  
**Author:** Dhruvin Rupesh Soni

#### fix: upgrade upload-artifact from v3 to v4 in deployment-status workflow

- Fixed GitHub Actions error: Missing download info for actions/upload-artifact@v3
- Updated to actions/upload-artifact@v4 for compatibility
- Simplified artifact naming to avoid shell command issues
- Ensures deployment status workflow runs successfully

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-04 02:06:26 +0530  
**Commit:** [1a91e0a](https://github.com/dhruvinrsoni/cipher-alchemist/commit/1a91e0a0a4157f3e6e64b537fc752e0bfb6ed3f8)  
**Author:** Dhruvin Rupesh Soni

#### Add .github/workflows/rollback.yml

Signed-off-by: Dhruvin Rupesh Soni <dhruvinrsoni@gmail.com>

---

**Date:** 2025-06-04 02:05:10 +0530  
**Commit:** [2617eb6](https://github.com/dhruvinrsoni/cipher-alchemist/commit/2617eb60c4bc9936f91f220a27378be8ce581903)  
**Author:** Dhruvin Rupesh Soni

#### 🏗️ Complete modular release architecture implementation

✅ **Modular Architecture Complete**:
- Created 4 independent workflows: create-tag-release, deploy-by-version, rollback, deployment-status
- Removed redundant rollback-fixed.yml backup file
- Added comprehensive modular architecture documentation

🧹 **Project Simplification for v1.0.0**:
- Removed password strength analysis features for basic toolkit focus
- Updated all documentation to reflect actual v1.0.0 features
- Cleaned up temporary files (CHANGELOG_CLEAN.md, CHANGELOG_TEMP.md, test_commit_body.bat)

📚 **Comprehensive Documentation**:
- MODULAR-RELEASE-ARCHITECTURE.md - Complete architecture explanation
- RELEASE-v1.0.0.md - Detailed v1.0.0 release documentation
- SIMPLIFICATION-SUMMARY.md - Project simplification summary
- Updated README.md and CHANGELOG.md with actual features

🔧 **Enhanced Validation System**:
- validate-release.bat - Generic, version-independent validation
- release-v1.0.0.bat - Specific v1.0.0 validation reporting
- quick-release.bat - Release status and GitHub Actions guidance

🕐 **IST Timezone Support**:
- Updated version.txt with IST timezone format
- All workflows support Asia/Kolkata timezone

🎯 **Ready for First Modular Release Test**:
- Architecture: ✅ Complete (306+204+176+97 lines of workflows)
- Documentation: ✅ Comprehensive
- Validation: ✅ Full validation scripts
- Cleanup: ✅ All temporary files removed

Next: Test end-to-end modular workflow with v1.0.0 release

[release-architecture]

---

**Date:** 2025-06-03 23:54:08 +0530  
**Commit:** [dc16003](https://github.com/dhruvinrsoni/cipher-alchemist/commit/dc160035efcede2c515a707822310a74fbcb7722)  
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
**Commit:** [899f74c](https://github.com/dhruvinrsoni/cipher-alchemist/commit/899f74c7c34cd7a4aa80352a5654b9706e9b5e1f)  
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
**Commit:** [aae44e2](https://github.com/dhruvinrsoni/cipher-alchemist/commit/aae44e22524349c11852433c0e1a859f78592c51)  
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
**Commit:** [5c16d75](https://github.com/dhruvinrsoni/cipher-alchemist/commit/5c16d75dd769ae217b3eedda245ee86eeeb00fba)  
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
**Commit:** [20a404a](https://github.com/dhruvinrsoni/cipher-alchemist/commit/20a404a9a813eb7ada80aa1c1d7c37585f18e3ec)  
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
**Commit:** [9201d1b](https://github.com/dhruvinrsoni/cipher-alchemist/commit/9201d1be2c3ac338bdc3ece53fa9f231dde860be)  
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
**Commit:** [e7d82c0](https://github.com/dhruvinrsoni/cipher-alchemist/commit/e7d82c0d0774d70e563f0c403104548214a83ad3)  
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
**Commit:** [8cbd8f6](https://github.com/dhruvinrsoni/cipher-alchemist/commit/8cbd8f63e05525e7eb4b51a8cbf6912c5cb372d7)  
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
**Commit:** [da179f2](https://github.com/dhruvinrsoni/cipher-alchemist/commit/da179f278fad9d59a88b9cdc9f1f08db6972b6bc)  
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
**Commit:** [c152833](https://github.com/dhruvinrsoni/cipher-alchemist/commit/c15283303f2061946ac220bf29b043285f3d6c6e)  
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
**Commit:** [d912561](https://github.com/dhruvinrsoni/cipher-alchemist/commit/d912561a0ade5f75674ab84c33713bd88c2dade6)  
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
**Commit:** [fcc1a08](https://github.com/dhruvinrsoni/cipher-alchemist/commit/fcc1a0897f63fd60bb0a5988d4a7550d49dba721)  
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
**Commit:** [f3c0f60](https://github.com/dhruvinrsoni/cipher-alchemist/commit/f3c0f609f289dfda21c0f0f1b9fc904d06ef506d)  
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
**Commit:** [93926f3](https://github.com/dhruvinrsoni/cipher-alchemist/commit/93926f3519eb74b7b0146826ffb0338d0d46ed5c)  
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
**Commit:** [ef5e059](https://github.com/dhruvinrsoni/cipher-alchemist/commit/ef5e059fe4f78fe95dae706bb1fcb00ce447f0a5)  
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
**Commit:** [978b656](https://github.com/dhruvinrsoni/cipher-alchemist/commit/978b656a644b6a8bf5ecae1d13b7217878344a6d)  
**Author:** Dhruvin Rupesh Soni

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
**Commit:** [b86d103](https://github.com/dhruvinrsoni/cipher-alchemist/commit/b86d1038ff7506780017ed464a8317d46b3266ac)  
**Author:** Dhruvin Rupesh Soni

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
**Commit:** [6ce195e](https://github.com/dhruvinrsoni/cipher-alchemist/commit/6ce195e3b5397635e0b114442f45f50739423bb4)  
**Author:** Dhruvin Rupesh Soni

#### 🔧 chore: enhance version format with IST time and better display

- Add India Standard Time (IST) format to version information
- Improve formatting with emojis and attribution
- Store commit hash and time as step outputs for reuse
- Update commit message for version updates to be more descriptive

---

**Date:** 2025-06-03 00:42:08 +0530  
**Commit:** [fcc731e](https://github.com/dhruvinrsoni/cipher-alchemist/commit/fcc731e2ca1224eaf51454014ae931c405ca2f70)  
**Author:** Dhruvin Rupesh Soni

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
**Commit:** [9cd546c](https://github.com/dhruvinrsoni/cipher-alchemist/commit/9cd546c7c12d8de9e9aaf54b8472ce8ffeae66ac)  
**Author:** Dhruvin Rupesh Soni

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
**Commit:** [2b4d68a](https://github.com/dhruvinrsoni/cipher-alchemist/commit/2b4d68a362138dacabd5baaa56e5ee9eac39f0de)  
**Author:** Dhruvin Rupesh Soni

#### Fix name in main page and add icons

---

**Date:** 2025-06-02 01:01:23 +0530  
**Commit:** [2badf16](https://github.com/dhruvinrsoni/cipher-alchemist/commit/2badf167844310f0e61f8b6bb6192da06e92641c)  
**Author:** Dhruvin Rupesh Soni

#### Replace PNG icons with favicon.ico in manifest.json

Standardize PWA icons by using the existing favicon.ico instead of
separate PNG files to ensure consistent branding between browser
and PWA installations.

---

**Date:** 2025-06-02 00:53:30 +0530  
**Commit:** [525aa5d](https://github.com/dhruvinrsoni/cipher-alchemist/commit/525aa5d7931e8d111c6ad7858ab805f1162659c4)  
**Author:** Dhruvin Rupesh Soni

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
**Commit:** [42cecb4](https://github.com/dhruvinrsoni/cipher-alchemist/commit/42cecb4ef471eff508234735f5b64e2e1ee99dba)  
**Author:** Dhruvin Rupesh Soni

#### fix: resolve textarea overflow and improve mobile responsiveness

---

**Date:** 2025-06-02 00:41:30 +0530  
**Commit:** [92ca7de](https://github.com/dhruvinrsoni/cipher-alchemist/commit/92ca7defbd009a98c918651049a517fdf47a7690)  
**Author:** Dhruvin Rupesh Soni

#### fix: improve theme toggle functionality for mobile devices

- Refactor theme system to use explicit theme classes
- Enhance mobile UI with fixed positioning for theme toggle button
- Add flexbox alignment for better button appearance on small screens
- Fix theme persistence by improving localStorage handling

---

**Date:** 2025-06-02 00:34:21 +0530  
**Commit:** [cf557e7](https://github.com/dhruvinrsoni/cipher-alchemist/commit/cf557e777e67265ca3c03f608c7833013e1f1d85)  
**Author:** Dhruvin Rupesh Soni

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
**Commit:** [70629ab](https://github.com/dhruvinrsoni/cipher-alchemist/commit/70629abd4b6fa7d4e05ae2ddc33347326ca3c482)  
**Author:** Dhruvin Rupesh Soni

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
**Commit:** [98ed462](https://github.com/dhruvinrsoni/cipher-alchemist/commit/98ed46225368d6358e4e2cd9877d513109d00252)  
**Author:** Dhruvin Rupesh Soni

#### Update app name and title with icon link

UPdate the title to "Cipher Alchemist" and the app name to "Cipher Alchemist".
Also, add a favicon link to the HTML file.

---

**Date:** 2025-06-01 23:33:48 +0530  
**Commit:** [8e51344](https://github.com/dhruvinrsoni/cipher-alchemist/commit/8e51344943d65535372c413e2212d29a63e4f8eb)  
**Author:** Dhruvin Rupesh Soni

#### Add favicon.ico files

added the favicon ico files to the repository

---

**Date:** 2025-06-01 23:17:07 +0530  
**Commit:** [2d2c173](https://github.com/dhruvinrsoni/cipher-alchemist/commit/2d2c1731ae919f5f6cc3e4dbad838ddc83049378)  
**Author:** Dhruvin Rupesh Soni

#### Initial commit

---

