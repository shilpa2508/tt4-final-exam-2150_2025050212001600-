# ----- Build Stage -----
    FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

    WORKDIR /app
    COPY . ./
    
    RUN dotnet restore "ContactManagerAPI.csproj"
    RUN dotnet publish "ContactManagerAPI.csproj" -c Release -o /app/publish
    
    # ----- Runtime Stage -----
    FROM mcr.microsoft.com/dotnet/aspnet:7.0
    WORKDIR /app
    COPY --from=build /app/publish .
    
    ENTRYPOINT ["dotnet", "ContactManagerAPI.dll"]
    