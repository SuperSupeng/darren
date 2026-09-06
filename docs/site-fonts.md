# 本地 Noto Serif SC 字体维护

站点继续使用 Noto Serif SC 的原始字形。Google Fonts 原先为 400、500、600 三个字重重复生成了大量 Unicode 分段声明；现在从同一官方字体生成两份本地 WOFF2，使用 400–600 可变字重范围：Latin 与 CJK 各一份。浏览器根据实际文字和 `unicode-range` 下载所需部分，英文页面不会仅因全局字体声明而下载 CJK 文件。

字体通过布局导入的 CSS 由 Next 打包并从同域提供。中文字体构建无需下载 Google Fonts；访问时与原配置一样从同域获取。Geist 仍使用现有的 `next/font/google` 配置。保留 `font-display: swap` 与系统宋体/serif 回退；超出子集的新汉字会使用系统字体，不会因此变成不可读内容。

`--font-site-serif` 与内页使用的 `--font-noto-serif` 别名必须在同一元素上定义。只在 `:root` 引用一个稍后才在 body 定义的变量，会提前固定为回退字体。浏览器验证应检查实际使用的字体及请求，不能仅凭页面更快或字体文件存在判断优化成功。

## 来源与许可

- 官方仓库：[google/fonts 的 Noto Serif SC](https://github.com/google/fonts/tree/8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5/ofl/notoserifsc)。固定提交：`8b0a1d0f5983c89bc2b93f1b5fb55f9e252744b5`。
- 原始文件：`NotoSerifSC[wght].ttf`，25,125,512 字节，SHA-256 `050080d9255a86808f2945bffac582b31ef32bc36411ce29563b4961670c66f9`。
- 官方 `METADATA.pb` 指向 Noto CJK 上游提交 `985fa52c81c1d6692ccdd82bc3656e8fb932fd89`；原始字重范围 200–900。站点只保留原先使用的 400–600 范围。
- SIL Open Font License 1.1 原文随文件保存于 `src/app/fonts/noto-serif-sc/OFL.txt`；许可 SHA-256 为 `5e0da210fb04058a8c0087985d2d456b931c2579811a49655721d3cf0c36b6d6`。字体内部版权记录也被保留。
- 25 MB 的原始 TTF 只缓存到临时目录，不放入 Git。提交生成的 WOFF2、CSS、许可和覆盖清单即可。

## 修改文案后的离线检查

在仓库根目录执行以下命令，仅需 Python 标准库，不联网、不安装字体工具、不修改文件：

```sh
python3 scripts/site-fonts.py
```

检查扫描 `src` 的 TS/TSX/CSS/JSON、`messages` 和 `content` 的 Markdown，包含中英文案例、文章、组件中的文字以及 JS/JSON Unicode 转义。字体资源目录与内部文档不参与扫描。为避免漏掉嵌在组件中的公开文字，代码和注释里的字符也会被少量额外覆盖；Latin-1 另行补齐。

检查使用已校验字体生成的覆盖清单，核对 WOFF2、CSS 与许可的 SHA-256，并对新增但尚未收入子集的可用字符返回失败。原始 Noto Serif SC 自身不支持的符号、旗帜、emoji 继续使用系统回退，输出中会明确列出，不将其伪报为已覆盖。格式控制符不需要可见字形，不计作缺字。

## 需要新字形时重新生成

生成工具只安装到临时环境，不改变网站依赖。版本固定，脚本校验下载文件的 SHA-256；再次生成可复用已验证缓存。

```sh
python3 -m venv /tmp/darren-font-tools
/tmp/darren-font-tools/bin/python -m pip install 'fonttools[woff]==4.60.2' 'brotli==1.1.0' 'zopfli==0.2.3.post1'
/tmp/darren-font-tools/bin/python scripts/site-fonts.py --generate
python3 scripts/site-fonts.py
```

生成过程保留默认标准排版特性，包括 kerning、ligatures、语言字形和竖排字形；不加入当前页面未用的额外样式替换。生成物不包含当前日期，固定源文件、工具版本和字符集可重复生成相同文件。源字体缓存默认在系统临时目录下的 `darren-font-source`；可通过 `--cache /path/to/cache` 指定位置。只有重新生成且缓存缺失时才联网。

生成后提交 `src/app/fonts/noto-serif-sc/` 内的所有改动。按项目要求构建，检查首页、案例、长文章和英文页面的实际加载及字形。若未来引入其他字重、特殊字体特性、动态 CMS 或大量新内容，应重新评估分段方式，而不是不断扩大一个固定子集。

## 当前选择的依据

相同全站字符集的候选测量中，静态 400、500、600 三份合计 763,464 字节，变量 400–600 为 434,816 字节（均为分拆前、保留所有样式特性的候选）。因此保留可变字体，减少跨字重重复数据；最终两份文件使用标准排版特性，实际体积与完整覆盖范围见 `manifest.json` 和检查命令输出。最终页面网络与性能结果由本轮性能报告记录，不用字体文件体积代替浏览器实测。

生成 CSS 只有两条 `@font-face` 声明。没有按测试页面挑选字符，没有隐藏测试页面内容，也没有用系统字体替换已覆盖的 Noto Serif SC 字形。
