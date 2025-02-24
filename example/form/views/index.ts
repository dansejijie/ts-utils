const componentsContext = import.meta.glob('./*.vue', { eager: true });
const components: Record<string, any> = Object.keys(componentsContext).reduce((acc, cur) => {
    acc[cur.replace('./', '').replace('.vue', '')] = componentsContext[cur].default;
    return acc;
}, {} as Record<string, any>);

export default components;
