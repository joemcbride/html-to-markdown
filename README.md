# Utility to convert html files to markdown files

This is a basic utility to convert some html content to markdown files.  It attempts to download images and save them locally.  The new markdown file and any images are saved to a folder in the `./output` directory.

```
yarn install
yarn start ./files/1-basic-config-actions-conventions.html
```

Add additional html converters to `converters.js` for missed tags.

```javascript
const preConverter = {
  filter: 'pre',
  replacement: (content)=> {
    return '\n```\n' + content + '\n```\n'
  }
}
```

-------

Orignal purpose of this utility is to download documentation from codeplex.

**Steps to use**

1. Browse to wiki page
2. Use Chrome Dev Tools Elements tab to find the `wikidoc` div
3. Use `Copy-> Copy element` and past resulting html in a file
4. Run utility on new file
5. Compare rendered markdown to wiki page
