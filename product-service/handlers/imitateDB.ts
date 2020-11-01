import productsMap from './products.json';

export interface ProductEntity {
    id: string,
    title: string,
    price: number,
}

async function readProducts(): Promise<{
    [index: string]: ProductEntity
}> {
    await new Promise(resolve => {
        setTimeout(resolve, 100);
    });
    return productsMap;
}

export async function findAll(): Promise<ProductEntity[]> {
    const entitiesMap = await readProducts();
    return Object.values(entitiesMap);
}

export async function findById(productId: string): Promise<ProductEntity> {
    const entitiesMap = await readProducts();
    return entitiesMap[productId];
}
