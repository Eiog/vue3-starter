const vendorLibs: { match: string[]; output: string }[] = [
    {
        match: ['naive-ui'],
        output: 'naiveui',
    },
    {
        match: ['xgplayer'],
        output: 'xgplayer',
    },
    {
        match: ['@wangeditor'],
        output: 'wangeditor',
    },
    {
        match: ['echarts'],
        output: 'echarts',
    },
];
//分包
export const configManualChunk = (id: string) => {
    if (/[\\/]node_modules[\\/]/.test(id)) {
        const matchItem = vendorLibs.find((item) => {
            const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig');
            return reg.test(id);
        });
        return matchItem ? matchItem.output : null;
    }
};
