import { donarSchmea } from "@/schema/donarSchema";
import { ngoSchema } from "@/schema/ngoSchema";
import z from "zod";

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    headers?: Record<string, string>
}

class ApiClient {
   private async fetch<T>(endPoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const finalHeaders = { ...headers };
  let finalBody = body;

  if (!(body instanceof FormData)) {
    finalHeaders["Content-Type"] = "application/json";
    finalBody = body ? JSON.stringify(body) : undefined;
  }

  const response = await fetch(`/api/${endPoint}`, {
    method,
    headers: finalHeaders,
    body: finalBody,
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

    async signUp(data:any){
        return this.fetch("auth/signup", {
            method: "POST",
            body: data
        })
    };

    async uniqueName(userName:string){
        return this.fetch(`check-uni-uName?userName=${userName}`, {
            method: 'POST',
        });
    }


    async ngoRegister(data: z.infer<typeof ngoSchema> ){
        return this.fetch("ngo/register", {
            method: "POST",
            body: data
        })
    };

    async ngo(){
        return this.fetch("ngo")
    };

    
    async donarRegister(data: z.infer<typeof donarSchmea>){
        return this.fetch("donar/register", {
            method: "POST",
            body: data
        })
    };

    async donar(){
        return this.fetch("donar")
    };
}
export const apiClient = new ApiClient();