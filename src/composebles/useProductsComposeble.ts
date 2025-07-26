import { middlewareServiceBackend } from "@/middlewares/middlewareServiceApi"
import { event } from "@/plugins/firebase"
import type { ITypesProducts } from "@/types/products"

interface IProductsComposeble {
  view: () => Promise<ITypesProducts>
}

export class useProductsComposeble implements IProductsComposeble {
  view (): Promise<ITypesProducts> {
    return new Promise((resolve, reject) => {
      middlewareServiceBackend.get("/products")
        .then((responseMiddleware) => {
          const {
            data
          } = responseMiddleware

          if (!data) reject(Error("Houve um erro para conectar com api, por favor, tente novamente."))

          resolve(data)
        }).catch((error) => {
          event("error-view-products", error)
        })
    })
  }
}
