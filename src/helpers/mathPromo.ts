export const mathPromo = (coins: number) => {
    let proccent = 0;

    if (coins >= 50 && coins <= 100) proccent = 5;
    if (coins > 100 && coins <= 200) proccent = 10;
    if (coins > 200 && coins <= 500) proccent = 15;
    if (coins > 500) proccent = 20;

    return { coin: parseInt(String(coins - (coins / 100) * proccent)), discount: proccent };
};
