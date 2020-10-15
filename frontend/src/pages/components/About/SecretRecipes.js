import React from "react";

const SecretRecipes = (props) => {
  return (
    <div className="secret-recipes">
      <div className="image-side">
        <iframe
          title="title"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/HRcPr_es32c"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe>
      </div>
      <div className="text-side">
        <h1>Secret Recipes</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dolor
          est, tempor pulvinar lacinia ac, suscipit a ligula. Cras malesuada
          nisi in aliquam viverra. Integer et egestas lorem. Ut aliquam quis
          lorem nec laoreet. Nullam ultricies massa nec risus blandit porta.
          Donec sollicitudin mi mi, ultricies imperdiet arcu fermentum id. Morbi
          eleifend sem vestibulum magna semper iaculis. Aliquam dapibus, eros
          non consequat sodales, ligula nisi lobortis ante, vitae varius metus
          tellus eget leo. Morbi venenatis nisl quis mauris faucibus, sit amet
          aliquam mauris sagittis.
        </p>
      </div>
    </div>
  );
};

export default SecretRecipes;
