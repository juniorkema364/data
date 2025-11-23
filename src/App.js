import React, { useState } from 'react';
import { Download } from 'lucide-react';

const TransportDataGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generateData = () => {
    setGenerating(true);
    
    // Fonction pour générer des valeurs manquantes (12%)
    const addMissing = (value) => Math.random() < 0.12 ? '' : value;
    
    // Génération de 5000 individus
    const data = [];
    const headers = [
      'id', 'accident_grave', 'age', 'sexe', 'experience_conduite', 
      'type_vehicule', 'vitesse_moyenne', 'distance_parcourue',
      'heure_trajet', 'meteo', 'etat_route', 'zone_urbaine',
      'alcoolemie', 'fatigue_score', 'nb_infractions'
    ];
    
    data.push(headers);
    
    for (let i = 1; i <= 5000; i++) {
      const age = Math.floor(Math.random() * 65) + 18;
      const experience = Math.min(age - 18, Math.floor(Math.random() * 40));
      
       const accident_grave = Math.random() < 0.25 ? 1 : 0;
      
      const sexe = Math.random() < 0.55 ? 'Homme' : 'Femme';
      const types_vehicule = ['Voiture', 'Moto', 'Camion', 'Bus'];
      const type_vehicule = types_vehicule[Math.floor(Math.random() * types_vehicule.length)];
      
      const vitesse_moyenne = Math.floor(Math.random() * 80) + 40;
      const distance_parcourue = Math.floor(Math.random() * 500) + 10;
      const heure_trajet = Math.floor(Math.random() * 24);
      
      const meteos = ['Ensoleille', 'Nuageux', 'Pluvieux', 'Brouillard'];
      const meteo = meteos[Math.floor(Math.random() * meteos.length)];
      
      const etats_route = ['Bon', 'Moyen', 'Mauvais'];
      const etat_route = etats_route[Math.floor(Math.random() * etats_route.length)];
      
      const zone_urbaine = Math.random() < 0.6 ? 'Oui' : 'Non';
      const alcoolemie = Math.random() < 0.15 ? 1 : 0;
      const fatigue_score = Math.floor(Math.random() * 10) + 1;
      const nb_infractions = Math.floor(Math.random() * 10);
      
      data.push([
        i,
        accident_grave,
        addMissing(age),
        addMissing(sexe),
        addMissing(experience),
        addMissing(type_vehicule),
        addMissing(vitesse_moyenne),
        addMissing(distance_parcourue),
        addMissing(heure_trajet),
        addMissing(meteo),
        addMissing(etat_route),
        addMissing(zone_urbaine),
        addMissing(alcoolemie),
        addMissing(fatigue_score),
        addMissing(nb_infractions)
      ]);
    }
    
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      downloadFiles(data);
    }, 1000);
  };

  const downloadFiles = (data) => {
    // Format XLSX (CSV pour Excel)
    downloadCSV(data, 'transport_data.csv');
    
    // Format TXT
    downloadTXT(data, 'transport_data.txt');
    
    // Format pour Stata (CSV compatible)
    downloadCSV(data, 'transport_data_stata.csv');
  };

  const downloadCSV = (data, filename) => {
    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const downloadTXT = (data, filename) => {
    const txtContent = data.map(row => row.join('\t')).join('\n');
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Générateur de Données - Accidents de Transport
          </h1>
          <p className="text-gray-600 mb-6">
            Dataset de 5000 observations avec 12% de valeurs manquantes
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Variable Dépendante :</h3>
            <p className="text-blue-800">
              <strong>accident_grave</strong> (0 = Non grave, 1 = Grave)
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Variables Explicatives :</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-green-800">
              <div>• age (années)</div>
              <div>• sexe (Homme/Femme)</div>
              <div>• experience_conduite (années)</div>
              <div>• type_vehicule (4 catégories)</div>
              <div>• vitesse_moyenne (km/h)</div>
              <div>• distance_parcourue (km)</div>
              <div>• heure_trajet (0-23h)</div>
              <div>• meteo (4 catégories)</div>
              <div>• etat_route (3 catégories)</div>
              <div>• zone_urbaine (Oui/Non)</div>
              <div>• alcoolemie (0/1)</div>
              <div>• fatigue_score (1-10)</div>
              <div>• nb_infractions (0-10)</div>
            </div>
          </div>

          <button
            onClick={generateData}
            disabled={generating}
            className={`w-full py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              generating 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
            }`}
          >
            <Download size={20} />
            {generating ? 'Génération en cours...' : 'Générer et Télécharger les Données'}
          </button>

          {generated && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg">
              <p className="text-green-800 font-semibold">
                ✓ Fichiers générés avec succès !
              </p>
              <p className="text-sm text-green-700 mt-2">
                Téléchargés : transport_data.csv, transport_data.txt, transport_data_stata.csv
              </p>
              <p className="text-xs text-green-600 mt-2">
                Note : Pour les formats .dta et .sav, utilisez les codes d'importation fournis dans le document Stata
              </p>
            </div>
          )}

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">📝 Instructions :</h4>
            <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
              <li>Téléchargez les fichiers générés</li>
              <li>Placez-les dans votre répertoire de travail Stata</li>
              <li>Utilisez les codes fournis dans le document pour l'analyse</li>
              <li>Le fichier CSV peut être ouvert dans Excel et sauvegardé en .xlsx</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportDataGenerator;