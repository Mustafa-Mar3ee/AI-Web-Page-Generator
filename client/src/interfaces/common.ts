export type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;


export type WithCount<Item = any> = {
    items: Item[];
    totalItems: number;
}

export type WithoutCount<Item = any> = {
    items: Item[];
}

export type Replace<T, K extends keyof T, V> = {
    [P in keyof T]: P extends K ? V : T[P];
};
