const fs = require("fs");
const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Teku documentation",
  url: "https://docs.teku.consensys.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    }
  },
  favicon: "img/favicon.svg",
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Consensys-Incorporated", // Usually your GitHub org/user name.
  projectName: "doc.teku", // Usually your repo name.
  deploymentBranch: "gh-pages", // GitHub Pages deployment branch

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Set a base path separate from default /docs
          editUrl: "https://github.com/Consensys-Incorporated/doc.teku/tree/master/",
          routeBasePath: "/",
          path: "./docs",
          includeCurrentVersion: true,
          lastVersion: "", // defined further down in this file
          versions: {}, // defined at ./versions-preset.json
          // @ts-ignore
          // eslint-disable-next-line global-require
          include: ["**/*.md", "**/*.mdx"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // algolia: {
      //   // The application ID provided by Algolia
      //   appId: "NSRFPEJ4NC",
      //   // Public API key: it is safe to commit it
      //   apiKey: "cea41b975ad6c9a01408dfda6e0061d3",
      //   indexName: "teku",
      //   // ensures that search results are relevant to the current language and version.
      //   contextualSearch: true,
      //   // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      //   // externalUrlRegex: "external\\.com|domain\\.com",
      //   // Optional: Algolia search parameters
      //   searchParameters: {},
      //   // Optional: path for search page that enabled by default (`false` to disable it)
      //   searchPagePath: "search",
      //   // ... other Algolia params
      // },
      // announcementBar: {
      //   id: "announcement_bar",
      //   content: "⛔️ This documentation site is still under construction! 🚧",
      //   backgroundColor: "#fafbfc",
      //   textColor: "#091E42",
      //   isCloseable: false,
      // },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: "Teku",
        logo: {
          alt: "Teku",
          src: "img/logo.svg",
          srcDark: "img/logo_dark.svg",
          width: 32,
          height: 32,
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docSidebar",
            docId: "index",
            position: "left",
            label: "Docs",
          },
          {
            type: "docSidebar",
            sidebarId: "referenceSidebar",
            docId: "index",
            position: "left",
            label: "Reference",
          },
          {
            label: "API",
            to: "https://consensys.github.io/teku/",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
          },
          {
            href: "https://github.com/Consensys-Incorporated/teku",
            className: "header-github-link",
            position: "right",
          },
          {
            href: "https://discord.gg/teku",
            className: "header-discord-link",
            position: "right",
          },
          {
            href: "https://x.com/Teku_Consensys",
            className: "header-twitter-link",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/introduction",
              },
              {
                label: "Get started",
                to: "/get-started",
              },
              {
                label: "How to guides",
                to: "/how-to",
              },
              {
                label: "Tutorials",
                to: "/tutorials",
              },
            ],
          },
          {
            title: "Reference",
            items: [
              {
                label: "Command line",
                to: "/reference/cli",
              },
              {
                label: "REST API",
                to: "/reference/rest",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Teku Discord",
                href: "https://discord.gg/teku",
              },
              {
                label: "Teku GitHub",
                href: "https://github.com/Consensys-Incorporated/teku",
              },
              {
                label: "Teku documentation GitHub",
                href: "https://github.com/Consensys-Incorporated/doc.teku",
              },
              {
                label: "Subscribe to Teku releases",
                href: "https://share.hsforms.com/1bkXI6uLpSROGBRVig4KeIQ2urwb",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} ConsenSys, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["solidity", "toml"],
      },
      languageTabs: [
        {
          highlight: "bash",
          language: "curl",
          logoClass: "bash",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "go",
          language: "go",
          logoClass: "go",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
      ],
    }),
  plugins: [
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-F9RSB6WR52",
        anonymizeIP: true,
      },
    ],
    [
      "@docusaurus/plugin-google-tag-manager",
      {
        containerId: "GTM-W4K2Z88",
      },
    ],
    [
      "docusaurus-plugin-llms",
      {
        docsDir: "docs",
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        title: "Teku documentation",
        description:
          "Official Teku documentation: Ethereum consensus client, installation, configuration, staking and operations.",
        excludeImports: true,
        removeDuplicateHeadings: true,
        logLevel: process.env.CI ? "quiet" : "normal",
        ignoreFiles: ["img/**"],
        includeOrder: [
          "get-started/**/*",
          "concepts/**/*",
          "how-to/**/*",
          "tutorials/**/*",
          "reference/**/*",
        ],
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/HowTo/Get-Started/Installation-Options/Install-Binaries",
            to: "/get-started/install/install-binaries",
          },
          {
            from: "/HowTo/Get-Started/Installation-Options/Build-From-Source",
            to: "/get-started/install/build-from-source",
          },
          {
            from: "/HowTo/Get-Started/Installation-Options/Run-Docker-Image",
            to: "/get-started/install/run-docker-image",
          },
          {
            from: "/HowTo/Get-Started/Run-Teku",
            to: "/get-started/start-teku",
          },
          {
            from: "/HowTo/Get-Started/Connect/Connect-To-Mainnet",
            to: "/get-started/connect/mainnet",
          },
          {
            from: "/HowTo/Get-Started/Connect/Connect-To-Testnet",
            to: "/get-started/connect/testnet",
          },
          {
            from: "/HowTo/Get-Started/Checkpoint-Start",
            to: "/get-started/checkpoint-start",
          },
          {
            from: "/HowTo/Get-Started/Manage-Memory",
            to: "/get-started/manage-memory",
          },
          {
            from: "/HowTo/Get-Started/Migrate-to-Teku",
            to: "/get-started/migrate-to-teku",
          },
          {
            from: "/category/external-signing",
            to: "/how-to/use-external-signer",
          },
          {
            from: "/HowTo/External-Signer/Use-External-Signer",
            to: "/how-to/use-external-signer/use-web3signer",
          },
          {
            from: "/HowTo/External-Signer/Manage-keys",
            to: "/how-to/use-external-signer/manage-keys",
          },
          {
            from: "/HowTo/Load-Validators-No-Restart",
            to: "/how-to/load-validators-without-restarting",
          },
          {
            from: "/HowTo/Monitor/Metrics",
            to: "/how-to/monitor/use-metrics",
          },
          {
            from: "/HowTo/Monitor/Logging",
            to: "/how-to/monitor/configure-logging",
          },
          {
            from: "/HowTo/Configure/Use-Configuration-File",
            to: "/how-to/configure/use-config-file",
          },
          {
            from: "/HowTo/Configure/Proposer-Configuration",
            to: "/how-to/configure/use-proposer-config-file",
          },
          {
            from: "/HowTo/Configure/Configure-TLS",
            to: "/how-to/configure/tls",
          },
          {
            from: "/HowTo/Configure/Builder-Network",
            to: "/how-to/configure/builder-network",
          },
          {
            from: "/HowTo/Find-and-Connect/Specifying-NAT",
            to: "/how-to/find-and-connect/specify-nat",
          },
          {
            from: "/HowTo/Find-and-Connect/Improve-Connectivity",
            to: "/how-to/find-and-connect/improve-connectivity",
          },
          {
            from: "/HowTo/Voluntary-Exit",
            to: "/how-to/voluntarily-exit",
          },
          {
            from: "/HowTo/Reconstruct-Historical-States-Service",
            to: "/how-to/reconstruct-historical-states",
          },
          {
            from: "/HowTo/Sentry-Nodes",
            to: "/how-to/use-sentry-nodes",
          },
          {
            from: [
              "/category/troubleshoot",
              "/HowTo/Troubleshoot/Troubleshooting",
            ],
            to: "/how-to/troubleshoot",
          },
          {
            from: "/HowTo/Withdrawal-Keys",
            to: "/how-to/update-withdrawal-keys",
          },
          {
            from: ["/HowTo/Doppelganger-Detection", "/how-to/enable-doppelganger-detection"],
            to: "/development/how-to/prevent-slashing/detect-doppelgangers",
          },
          {
            from: "/HowTo/Migrate-Database",
            to: "/how-to/migrate-database",
          },
          {
            from: "/HowTo/Prevent-Slashing",
            to: "/how-to/prevent-slashing",
          },
          {
            from: "/Concepts/ArchitectureOverview",
            to: "/concepts/architecture",
          },
          {
            from: "/Reference/CLI/CLI-Syntax",
            to: "/reference/cli",
          },
          {
            from: "/category/get-started",
            to: "/get-started",
          },
          {
            from: "/category/install-teku",
            to: "/get-started/install",
          },
          {
            from: "/category/connect-to-a-network",
            to: "/get-started/connect",
          },
          {
            from: "/category/how-to",
            to: "/how-to",
          },
          {
            from: "/category/configure",
            to: "/how-to/configure",
          },
          {
            from: "/category/use-an-external-signer",
            to: "/how-to/use-external-signer",
          },
          {
            from: "/category/find-and-connect-to-peers",
            to: "/how-to/find-and-connect",
          },
          {
            from: "/category/monitor-nodes",
            to: "/how-to/monitor",
          },
          {
            from: "/category/concepts",
            to: "/concepts",
          },
          {
            from: "/category/tutorials",
            to: "/tutorials",
          },
          {
            from: "/concepts/merge",
            to: "/concepts",
          },
        ],
      },
    ],
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        docsRouteBasePath: "/",
        hashed: true,
        indexBlog: false,
        askAi: {
          project: "teku",                 
          apiUrl: process.env.ASK_AI_API_URL || "http://localhost:5000/api/stream?api_key=....",
          hotkey: "cmd+k",
          texts: {
            welcomeMessage:
              "Hi! I can answer questions about the documentation, its features or usage instructions. Be sure to check the source documentation links that I provide for full details.\n\n" +
              "Please do not input any of your own or another's personal information i.e, passwords, private keys, seed phrases, personal data, or other sensitive information. If you need support and do not want to engage with me, please reach out to us via Discord. Any information that you provide is not used for training my AI systems. For details on our data handling practices, see our Privacy Policy.\n\n" +
              "By proceeding you acknowledge the above.",
            inputPlaceholder: "Please ask a question",
          }              
        },        
      },
    ],
  ],
};

const data = fs.readFileSync("./versions-preset.json", {
  encoding: "utf8",
  flag: "r",
});

let versions = JSON.parse(data);
// Injecting preset versions into config object
config.presets[0][1].docs.versions = versions;
config.presets[0][1].docs.versions.current = {
  label: "development",
  path: "development",
};

let stableVersion = Object.keys(versions).find((key) =>
  versions[key].label.includes("stable"),
);
config.presets[0][1].docs.lastVersion = stableVersion;

module.exports = config;
