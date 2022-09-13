import { Ref } from 'vue';
const lazyLoad = {
  mounted(target: HTMLElement, binding: Ref<string>) {
    let lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        let lazyImage = entry.target as HTMLImageElement;
        // 相交率，默认是相对于浏览器视窗
        if (entry.intersectionRatio > 0) {
          lazyImage.src = binding.value;
          // 当前图片加载完之后需要去掉监听
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    lazyImageObserver.observe(target);
  },
};
export default lazyLoad;
