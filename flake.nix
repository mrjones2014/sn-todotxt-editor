{
  description =
    "Node.js development environment for Standard Notes editor extension";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    flake-compat = {
      url = "github:edolstra/flake-compat";
      flake = false;
    };
  };

  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_20
            nodePackages.pnpm
            nodePackages.typescript
            nodePackages.typescript-language-server
          ];

          # Add .gitignore patterns to avoid copying unnecessary files to the Nix store
          src = pkgs.lib.cleanSourceWith {
            src = ./.;
            filter = path: type:
              let baseName = baseNameOf path;
              in !(
                # Common patterns to exclude
                baseName == "node_modules" || baseName == ".git" || baseName
                == "dist" || baseName == "build" ||
                # Add other patterns as needed
                pkgs.lib.hasSuffix ".log" baseName);
          };
        };
      });
}
