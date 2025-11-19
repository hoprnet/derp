{
  description = "dishonest ethereum RPC provider";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, flake-utils, treefmt-nix }:
    flake-utils.lib.eachSystem [ "x86_64-linux" "aarch64-darwin" ] (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        treefmtEval = treefmt-nix.lib.evalModule pkgs {
          projectRootFile = "flake.nix";
          programs.deno.enable = true;
          settings.formatter.deno.includes = [ "*.ts" "*.js" ];
        };
      in
      {
        formatter = treefmtEval.config.build.wrapper;
        devShells.default = import ./shell.nix { inherit pkgs; };
      }
    );
}
