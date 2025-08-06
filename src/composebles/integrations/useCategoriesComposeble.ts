import { middlewareServiceBackend } from "@/middlewares/middlewareServiceApi"
import { event } from "@/plugins/firebase"
import type { ITypesCategories } from "@/types/categories"

interface ICategoriesComposeble {
  view: () => Promise<ITypesCategories>
}

export class useCategoriesComposeble implements ICategoriesComposeble {
  view (): Promise<ITypesCategories> {
    return new Promise((resolve, reject) => {
      middlewareServiceBackend.get("/categories")
        .then((responseMiddleware) => {
          const {
            data
          } = responseMiddleware

          if (!data) reject(Error("Houve um erro para conectar com api, por favor, tente novamente."))

          resolve(data)
        }).catch((error) => {
          event("error-get-categories", error)
        })
    })
  }
}
