// 创建新窗口并设置开启硬件加速
const url = 'http://10.0.42.28:3000/'
export function createWebview(pathname, id) {
  // 在Android5以上设备，如果默认没有开启硬件加速，则强制设置开启
  let styles = {}
  if (
    !plus.webview.defaultHardwareAccelerated() &&
    parseInt(plus.os.version) >= 5
  ) {
    styles.hardwareAccelerated = true
  }
  let w=plus.webview.create(
    url + pathname,
    id,
    styles,
    {
      AnimationTypeShow: 'slide-in-right',
    },
    300,
    (e) => {
      // showedCB && showedCB()
    }
  ) // 显示窗口
  w.show()
}
export function closeWebview() {
  
  var ws = plus.webview.currentWebview()
  plus.webview.close(ws)
}
