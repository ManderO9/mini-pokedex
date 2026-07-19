
export class ApiResponse<TData> {
  successful: boolean;
  data?: TData;
  errorMessage?: string;

  private constructor(
    successful: boolean,
    data?: TData,
    errorMessage?: string
  ) {
    this.successful = successful;
    this.data = data;
    this.errorMessage = errorMessage;
  }

  public static success<TData>(data: TData): ApiResponse<TData> {
    return new ApiResponse(true, data);
  }

  public static fail<TData>(errorMessage: string): ApiResponse<TData> {
    return new ApiResponse<TData>(false, undefined, errorMessage);
  }
}