    

export interface GraphQLResponse<TData> {
  data?: TData;
  errors?: GraphQLError[];
}

export interface GraphQLError {
  message: string;
}
