import { middlewareServiceBackend } from "@/middlewares/middlewareServiceApi"
import { event } from "@/plugins/firebase"
import type { ITypesComplements } from "@/types/complement"

interface IComplementsComposeble {
  view: () => Promise<ITypesComplements>
}

export class useComplementsComposeble implements IComplementsComposeble {
  view (): Promise<ITypesComplements> {
    return new Promise((resolve, reject) => {
      middlewareServiceBackend.get("/complements")
        .then((responseMiddleware) => {
          const {
            data
          } = responseMiddleware

          if (!data) reject(Error("Houve um erro para conectar com api, por favor, tente novamente."))

          resolve(data)
        }).catch((error) => {
          event("error-get-complements", error)
        })
    })
  }
}
