function testWish(wish) {
    let invalidPattern = /.*d+m+|đm+|địt+|d+i+t+|dcm+|mọe|đéo+|méo+|cặc|lồn|c+a+c+|l+o+n+|đít+|boogers|snot|poop|shucks|fuck|pussy|đĩ|ngu+|đụ|du+|di+|v+l+|v+c+l+|cút|phắn|xéo|cứt|chó.*/i;
    return !invalidPattern.test(wish);
}

module.exports = testWish;
